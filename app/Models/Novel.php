<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Novel extends Model
{
    use HasFactory;

    protected $fillable = [
        'title_ar',
        'title_en',
        'slug',
        'description_ar',
        'description_en',
        'price_dzd',
        'cover_image_path',
        'status',
    ];

    protected $casts = [
        'price_dzd' => 'decimal:2',
    ];

    /**
     * Boot: auto-generate slug from Arabic title when creating.
     */
    protected static function booted(): void
    {
        static::creating(function (Novel $novel) {
            if (empty($novel->slug)) {
                $novel->slug = Str::slug($novel->title_en ?: $novel->title_ar);
            }
        });
    }

    // ─── Relationships ─────────────────────────────────────────

    public function chapters(): HasMany
    {
        return $this->hasMany(Chapter::class)->orderBy('chapter_number');
    }

    public function orders(): HasMany
    {
        return $this->hasMany(\App\Models\Order::class);
    }

    public function entitlements(): HasMany
    {
        return $this->hasMany(\App\Models\Entitlement::class);
    }

    // ─── Scopes ────────────────────────────────────────────────

    public function scopePublished($query)
    {
        return $query->where('status', 'published');
    }

    public function scopeDraft($query)
    {
        return $query->where('status', 'draft');
    }

    // ─── Helpers ───────────────────────────────────────────────

    /**
     * Return the localised title based on the active locale.
     */
    public function localizedTitle(?string $locale = null): string
    {
        $locale = $locale ?? app()->getLocale();

        if ($locale === 'en' && $this->title_en) {
            return $this->title_en;
        }

        return $this->title_ar;
    }

    /**
     * Return the localised description based on the active locale.
     */
    public function localizedDescription(?string $locale = null): string
    {
        $locale = $locale ?? app()->getLocale();

        if ($locale === 'en' && $this->description_en) {
            return $this->description_en;
        }

        return $this->description_ar;
    }

    /**
     * Check if the novel is published.
     */
    public function isPublished(): bool
    {
        return $this->status === 'published';
    }

    /**
     * Get preview chapters (free to read).
     */
    public function previewChapters(): HasMany
    {
        return $this->chapters()->where('is_preview', true);
    }
}
