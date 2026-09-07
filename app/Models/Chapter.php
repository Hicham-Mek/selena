<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class Chapter extends Model
{
    use HasFactory;

    protected $fillable = [
        'novel_id',
        'chapter_number',
        'title',
        'content_text',
        'audio_path',
        'is_preview',
    ];

    protected $casts = [
        'is_preview' => 'boolean',
        'chapter_number' => 'integer',
    ];

    // ─── Relationships ─────────────────────────────────────────

    public function novel(): BelongsTo
    {
        return $this->belongsTo(Novel::class);
    }

    // ─── Helpers ───────────────────────────────────────────────

    /**
     * Check if this chapter has an audio file that exists on disk.
     */
    public function hasAudio(): bool
    {
        return $this->audio_path && Storage::disk('local')->exists($this->audio_path);
    }

    /**
     * Get the next chapter in the same novel.
     */
    public function nextChapter(): ?self
    {
        return static::where('novel_id', $this->novel_id)
            ->where('chapter_number', '>', $this->chapter_number)
            ->orderBy('chapter_number')
            ->first();
    }

    /**
     * Get the previous chapter in the same novel.
     */
    public function previousChapter(): ?self
    {
        return static::where('novel_id', $this->novel_id)
            ->where('chapter_number', '<', $this->chapter_number)
            ->orderByDesc('chapter_number')
            ->first();
    }
}
