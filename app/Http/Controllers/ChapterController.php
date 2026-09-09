<?php

namespace App\Http\Controllers;

use App\Models\Chapter;
use App\Models\Novel;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ChapterController extends Controller
{
    /**
     * Display a novel's page with its chapters list.
     */
    public function showNovel(Novel $novel): Response
    {
        $novel->load(['chapters' => function ($query) {
            $query->select('id', 'novel_id', 'chapter_number', 'title', 'title_en', 'is_preview', 'audio_path')
                  ->orderBy('chapter_number');
        }]);

        // Determine purchase status for the authenticated user
        /** @var User|null $user */
        $user = Auth::user();
        $purchaseStatus = null;

        if ($user) {
            if ($user->ownsNovel($novel)) {
                $purchaseStatus = 'owned';
            } else {
                $activeOrder = $user->activeOrderFor($novel);
                if ($activeOrder) {
                    $purchaseStatus = $activeOrder->status; // 'pending' or 'under_review'
                }
            }
        }

        return Inertia::render('Novels/Show', [
            'novel' => [
                'id'             => $novel->id,
                'title_ar'       => $novel->title_ar,
                'title_en'       => $novel->title_en,
                'slug'           => $novel->slug,
                'description_ar' => $novel->description_ar,
                'description_en' => $novel->description_en,
                'price_dzd'      => $novel->price_dzd,
                'cover_image_path' => $novel->cover_image_path,
                'status'         => $novel->status,
                'chapters'       => $novel->chapters->map(fn (Chapter $ch) => [
                    'id'             => $ch->id,
                    'chapter_number' => $ch->chapter_number,
                    'title'          => $ch->title,
                    'title_en'       => $ch->title_en,
                    'is_preview'     => $ch->is_preview,
                    'has_audio'      => filled($ch->audio_path),
                ]),
            ],
            'purchaseStatus' => $purchaseStatus,
        ]);
    }

    /**
     * Display a single chapter for reading.
     *
     * M6 Security Boundary:
     *   - Preview chapters: always accessible.
     *   - Paid chapters: require an active Entitlement for the parent novel.
     *   - Direct URL access by unauthenticated or unauthorized users is rejected.
     */
    public function show(Novel $novel, Chapter $chapter): Response|RedirectResponse
    {
        // Ensure the chapter belongs to this novel
        if ($chapter->novel_id !== $novel->id) {
            abort(404);
        }

        /** @var User|null $user */
        $user = Auth::user();

        // ── M6 Authorization Boundary ──────────────────────────────────────────
        $isAuthorized = $chapter->is_preview
            || ($user !== null && $user->hasEntitlementFor($novel->id));

        if (! $isAuthorized) {
            return redirect()
                ->route('novels.show', $novel->slug)
                ->with('error', __('chapter.purchase_required'));
        }
        // ───────────────────────────────────────────────────────────────────────

        // Generate a 2-hour signed URL for the audio, if the chapter has audio
        $audioUrl = null;
        if ($chapter->audio_path) {
            $audioUrl = URL::temporarySignedRoute(
                'chapters.audio',
                now()->addHours(2),
                ['chapter' => $chapter->id]
            );
        }

        $prevChapter = $chapter->previousChapter();
        $nextChapter = $chapter->nextChapter();

        return Inertia::render('Chapters/Show', [
            'chapter' => [
                'id'             => $chapter->id,
                'chapter_number' => $chapter->chapter_number,
                'title'          => $chapter->title,
                'title_en'       => $chapter->title_en,
                'content_text'   => $chapter->content_text,
                'is_preview'     => $chapter->is_preview,
                'has_audio'      => $chapter->hasAudio(),
            ],
            'novel' => [
                'id'       => $novel->id,
                'title_ar' => $novel->title_ar,
                'title_en' => $novel->title_en,
                'slug'     => $novel->slug,
            ],
            'audio_url'   => $audioUrl,
            'prevChapter' => $prevChapter ? [
                'id'             => $prevChapter->id,
                'chapter_number' => $prevChapter->chapter_number,
                'title'          => $prevChapter->title,
                'title_en'       => $prevChapter->title_en,
                'is_preview'     => $prevChapter->is_preview,
            ] : null,
            'nextChapter' => $nextChapter ? [
                'id'             => $nextChapter->id,
                'chapter_number' => $nextChapter->chapter_number,
                'title'          => $nextChapter->title,
                'title_en'       => $nextChapter->title_en,
                'is_preview'     => $nextChapter->is_preview,
            ] : null,
        ]);
    }

    /**
     * Stream a chapter's audio file with HTTP 206 Range support.
     *
     * Protected by the `signed` middleware — the URL expires after 2 hours.
     * Double-checks authorization server-side (preview OR entitlement).
     *
     * M6 Architecture note:
     *   We use response()->file() for full HTTP 206 support (browser scrubbing).
     *   The signed middleware rejects expired/tampered URLs with a 403.
     */
    public function streamAudio(Request $request, Chapter $chapter): StreamedResponse
    {
        /** @var User|null $user */
        $user = Auth::user();

        // Double-check authorization — signed URL alone is not enough
        $isAuthorized = $chapter->is_preview
            || ($user !== null && $user->hasEntitlementFor($chapter->novel_id));

        if (! $isAuthorized) {
            abort(403, 'You do not have access to this chapter audio.');
        }

        if (! $chapter->audio_path) {
            abort(404, 'No audio file for this chapter.');
        }

        $disk = Storage::disk('local');

        if (! $disk->exists($chapter->audio_path)) {
            abort(404, 'Audio file not found.');
        }

        $path     = $disk->path($chapter->audio_path);
        $size     = filesize($path);
        $mimeType = $this->getAudioMimeType($path);

        // Parse Range header for HTTP 206 Partial Content (audio scrubbing)
        $rangeHeader = $request->header('Range');

        if ($rangeHeader) {
            return $this->streamPartial($path, $size, $mimeType, $rangeHeader);
        }

        // Full file — HTTP 200
        return new StreamedResponse(function () use ($path) {
            $stream = fopen($path, 'rb');
            fpassthru($stream);
            fclose($stream);
        }, 200, [
            'Content-Type'   => $mimeType,
            'Content-Length' => $size,
            'Accept-Ranges'  => 'bytes',
            'Cache-Control'  => 'private, no-store',
        ]);
    }

    /**
     * Stream a partial byte range of an audio file (HTTP 206).
     */
    private function streamPartial(string $path, int $size, string $mimeType, string $rangeHeader): StreamedResponse
    {
        preg_match('/bytes=(\d+)-(\d*)/', $rangeHeader, $matches);

        $start = (int) ($matches[1] ?? 0);
        $end   = isset($matches[2]) && $matches[2] !== '' ? (int) $matches[2] : $size - 1;

        if ($start > $end || $start >= $size) {
            return new StreamedResponse(null, 416, [
                'Content-Range' => "bytes */$size",
            ]);
        }

        $end    = min($end, $size - 1);
        $length = $end - $start + 1;

        return new StreamedResponse(function () use ($path, $start, $length) {
            $stream     = fopen($path, 'rb');
            fseek($stream, $start);
            $remaining  = $length;
            $bufferSize = 8192;

            while ($remaining > 0 && ! feof($stream)) {
                $read = min($bufferSize, $remaining);
                echo fread($stream, $read);
                $remaining -= $read;
                flush();
            }

            fclose($stream);
        }, 206, [
            'Content-Type'   => $mimeType,
            'Content-Length' => $length,
            'Content-Range'  => "bytes $start-$end/$size",
            'Accept-Ranges'  => 'bytes',
            'Cache-Control'  => 'private, no-store',
        ]);
    }

    /**
     * Determine the MIME type of an audio file from its extension.
     */
    private function getAudioMimeType(string $path): string
    {
        return match (strtolower(pathinfo($path, PATHINFO_EXTENSION))) {
            'mp3'  => 'audio/mpeg',
            'm4a'  => 'audio/mp4',
            'wav'  => 'audio/wav',
            default => 'application/octet-stream',
        };
    }
}
