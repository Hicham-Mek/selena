<?php

namespace App\Http\Controllers;

use App\Models\Chapter;
use App\Models\Novel;
use Inertia\Inertia;
use Inertia\Response;

class ChapterController extends Controller
{
    /**
     * Display a novel's page with its chapters list.
     */
    public function showNovel(Novel $novel): Response
    {
        $novel->load(['chapters' => function ($query) {
            $query->select('id', 'novel_id', 'chapter_number', 'title', 'is_preview', 'audio_path')
                  ->orderBy('chapter_number');
        }]);

        return Inertia::render('Novels/Show', [
            'novel' => [
                'id' => $novel->id,
                'title_ar' => $novel->title_ar,
                'title_en' => $novel->title_en,
                'slug' => $novel->slug,
                'description_ar' => $novel->description_ar,
                'description_en' => $novel->description_en,
                'price_dzd' => $novel->price_dzd,
                'cover_image_path' => $novel->cover_image_path,
                'status' => $novel->status,
                'chapters' => $novel->chapters->map(fn (Chapter $ch) => [
                    'id' => $ch->id,
                    'chapter_number' => $ch->chapter_number,
                    'title' => $ch->title,
                    'is_preview' => $ch->is_preview,
                    'has_audio' => filled($ch->audio_path),
                ]),
            ],
        ]);
    }

    /**
     * Display a single chapter for reading.
     */
    public function show(Novel $novel, Chapter $chapter): Response
    {
        // Ensure the chapter belongs to this novel
        if ($chapter->novel_id !== $novel->id) {
            abort(404);
        }

        // Only preview chapters are accessible for free reading
        if (! $chapter->is_preview) {
            abort(403, 'This chapter requires purchase.');
        }

        $prevChapter = $chapter->previousChapter();
        $nextChapter = $chapter->nextChapter();

        return Inertia::render('Chapters/Show', [
            'chapter' => [
                'id' => $chapter->id,
                'chapter_number' => $chapter->chapter_number,
                'title' => $chapter->title,
                'content_text' => $chapter->content_text,
                'is_preview' => $chapter->is_preview,
                'has_audio' => $chapter->hasAudio(),
            ],
            'novel' => [
                'id' => $novel->id,
                'title_ar' => $novel->title_ar,
                'title_en' => $novel->title_en,
                'slug' => $novel->slug,
            ],
            'prevChapter' => $prevChapter ? [
                'id' => $prevChapter->id,
                'chapter_number' => $prevChapter->chapter_number,
                'title' => $prevChapter->title,
                'is_preview' => $prevChapter->is_preview,
            ] : null,
            'nextChapter' => $nextChapter ? [
                'id' => $nextChapter->id,
                'chapter_number' => $nextChapter->chapter_number,
                'title' => $nextChapter->title,
                'is_preview' => $nextChapter->is_preview,
            ] : null,
        ]);
    }
}
