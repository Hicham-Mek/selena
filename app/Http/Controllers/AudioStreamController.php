<?php

namespace App\Http\Controllers;

use App\Models\Chapter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\StreamedResponse;

class AudioStreamController extends Controller
{
    /**
     * Stream audio for a chapter with HTTP 206 byte-range support.
     *
     * Only serves audio for preview chapters. Non-preview chapters
     * return 403 (future: paid access gating via entitlements).
     */
    public function stream(Request $request, Chapter $chapter)
    {
        // Only preview chapters are freely accessible
        if (! $chapter->is_preview) {
            abort(403, 'This chapter requires purchase.');
        }

        // Ensure the chapter has an audio file
        if (! $chapter->audio_path) {
            abort(404, 'No audio file for this chapter.');
        }

        $disk = Storage::disk('local');

        if (! $disk->exists($chapter->audio_path)) {
            abort(404, 'Audio file not found.');
        }

        $path = $disk->path($chapter->audio_path);
        $size = filesize($path);
        $mimeType = $this->getAudioMimeType($path);

        // Handle Range requests for audio scrubbing (HTTP 206 Partial Content)
        $rangeHeader = $request->header('Range');

        if ($rangeHeader) {
            return $this->streamPartial($path, $size, $mimeType, $rangeHeader);
        }

        // Full file response (HTTP 200)
        return new StreamedResponse(function () use ($path) {
            $stream = fopen($path, 'rb');
            fpassthru($stream);
            fclose($stream);
        }, 200, [
            'Content-Type' => $mimeType,
            'Content-Length' => $size,
            'Accept-Ranges' => 'bytes',
            'Cache-Control' => 'public, max-age=86400',
        ]);
    }

    /**
     * Stream a partial range of the file (HTTP 206).
     */
    private function streamPartial(string $path, int $size, string $mimeType, string $rangeHeader): StreamedResponse
    {
        // Parse the Range header: "bytes=START-END"
        preg_match('/bytes=(\d+)-(\d*)/', $rangeHeader, $matches);

        $start = (int) ($matches[1] ?? 0);
        $end = isset($matches[2]) && $matches[2] !== '' ? (int) $matches[2] : $size - 1;

        // Validate range
        if ($start > $end || $start >= $size) {
            return new StreamedResponse(null, 416, [
                'Content-Range' => "bytes */$size",
            ]);
        }

        $end = min($end, $size - 1);
        $length = $end - $start + 1;

        return new StreamedResponse(function () use ($path, $start, $length) {
            $stream = fopen($path, 'rb');
            fseek($stream, $start);
            $remaining = $length;
            $bufferSize = 8192;

            while ($remaining > 0 && !feof($stream)) {
                $read = min($bufferSize, $remaining);
                echo fread($stream, $read);
                $remaining -= $read;
                flush();
            }

            fclose($stream);
        }, 206, [
            'Content-Type' => $mimeType,
            'Content-Length' => $length,
            'Content-Range' => "bytes $start-$end/$size",
            'Accept-Ranges' => 'bytes',
            'Cache-Control' => 'public, max-age=86400',
        ]);
    }

    /**
     * Determine the MIME type of the audio file.
     */
    private function getAudioMimeType(string $path): string
    {
        $extension = strtolower(pathinfo($path, PATHINFO_EXTENSION));

        return match ($extension) {
            'mp3' => 'audio/mpeg',
            'm4a' => 'audio/mp4',
            'wav' => 'audio/wav',
            default => 'application/octet-stream',
        };
    }
}
