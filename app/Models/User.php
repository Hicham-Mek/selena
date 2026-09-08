<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Filament\Models\Contracts\FilamentUser;
use Filament\Panel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements FilamentUser
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'is_admin',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_admin' => 'boolean',
        ];
    }

    public function profile()
    {
        return $this->hasOne(Profile::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    /**
     * Check if user is an admin.
     */
    public function isAdmin(): bool
    {
        return (bool) $this->is_admin;
    }

    /**
     * Check if the user has an active (pending or under_review) order for a novel.
     */
    public function hasActiveOrderFor(Novel $novel): bool
    {
        return $this->orders()
            ->where('novel_id', $novel->id)
            ->active()
            ->exists();
    }

    /**
     * Check if the user owns a novel (has an approved order).
     * This will be replaced by entitlements in M5.
     */
    public function ownsNovel(Novel $novel): bool
    {
        return $this->orders()
            ->where('novel_id', $novel->id)
            ->approved()
            ->exists();
    }

    /**
     * Get the active order for a specific novel, if any.
     */
    public function activeOrderFor(Novel $novel): ?Order
    {
        return $this->orders()
            ->where('novel_id', $novel->id)
            ->active()
            ->first();
    }

    /**
     * Determine whether the user can access the Filament panel.
     */
    public function canAccessPanel(Panel $panel): bool
    {
        return $this->isAdmin();
    }
}
