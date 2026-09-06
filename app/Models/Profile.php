<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $fillable = [
        'user_id',
        'first_name',
        'last_name',
        'phone_number',
        'whatsapp_enabled'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
