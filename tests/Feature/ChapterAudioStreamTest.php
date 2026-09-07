<?php

use App\Models\Chapter;
use App\Models\Novel;
use Illuminate\Support\Facades\Storage;


beforeEach(function () {
    /** @var Novel $this->novel */ $this->novel = Novel::create([
        'title_ar' => 'رواية اختبارية',
        'title_en' => 'Test Novel',
        'slug' => 'test-novel',
        'description_ar' => 'وصف الرواية الاختبارية',
        'price_dzd' => 500.00,
        'status' => 'published',
    ]);
});

test('preview chapter with audio returns 200 for full request', function () {
    // Create a fake audio file on the local disk
    Storage::disk('local')->put('audio/chapters/test.mp3', 'fake-audio-content-here');

    $chapter = Chapter::create([
        'novel_id' => $this->novel->id,
        'chapter_number' => 1,
        'title' => 'Chapter 1',
        'content_text' => '<p>Chapter content</p>',
        'audio_path' => 'audio/chapters/test.mp3',
        'is_preview' => true,
    ]);

    $response = $this->get(route('chapters.audio', $chapter));

    $response->assertStatus(200);
    $response->assertHeader('Content-Type', 'audio/mpeg');
    $response->assertHeader('Accept-Ranges', 'bytes');

    // Cleanup
    Storage::disk('local')->delete('audio/chapters/test.mp3');
});

test('preview chapter with audio returns 206 for range request', function () {
    // Create a fake audio file on the local disk
    Storage::disk('local')->put('audio/chapters/test-range.mp3', str_repeat('x', 1000));

    $chapter = Chapter::create([
        'novel_id' => $this->novel->id,
        'chapter_number' => 2,
        'title' => 'Chapter 2',
        'content_text' => '<p>Chapter content</p>',
        'audio_path' => 'audio/chapters/test-range.mp3',
        'is_preview' => true,
    ]);

    $response = $this->get(route('chapters.audio', $chapter), [
        'Range' => 'bytes=0-499',
    ]);

    $response->assertStatus(206);
    $response->assertHeader('Content-Range');
    $response->assertHeader('Accept-Ranges', 'bytes');

    // Cleanup
    Storage::disk('local')->delete('audio/chapters/test-range.mp3');
});

test('non-preview chapter returns 403', function () {
    $chapter = Chapter::create([
        'novel_id' => $this->novel->id,
        'chapter_number' => 3,
        'title' => 'Paid Chapter',
        'content_text' => '<p>Paid content</p>',
        'audio_path' => 'audio/chapters/paid.mp3',
        'is_preview' => false,
    ]);

    $response = $this->get(route('chapters.audio', $chapter));

    $response->assertStatus(403);
});

test('chapter without audio file returns 404', function () {
    $chapter = Chapter::create([
        'novel_id' => $this->novel->id,
        'chapter_number' => 4,
        'title' => 'No Audio Chapter',
        'content_text' => '<p>Content without audio</p>',
        'audio_path' => null,
        'is_preview' => true,
    ]);

    $response = $this->get(route('chapters.audio', $chapter));

    $response->assertStatus(404);
});

test('chapter with missing audio file on disk returns 404', function () {
    $chapter = Chapter::create([
        'novel_id' => $this->novel->id,
        'chapter_number' => 5,
        'title' => 'Missing Audio Chapter',
        'content_text' => '<p>Content</p>',
        'audio_path' => 'audio/chapters/nonexistent.mp3',
        'is_preview' => true,
    ]);

    $response = $this->get(route('chapters.audio', $chapter));

    $response->assertStatus(404);
});
