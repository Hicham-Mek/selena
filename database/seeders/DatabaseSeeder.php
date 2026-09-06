<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Standard Test User
        $user = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        $user->profile()->create([
            'first_name' => 'Test',
            'last_name' => 'User',
            'phone_number' => '+1234567890',
            'whatsapp_enabled' => true,
        ]);

        // Test Admin User
        $admin = User::factory()->admin()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
        ]);

        $admin->profile()->create([
            'first_name' => 'Admin',
            'last_name' => 'User',
            'phone_number' => '+1987654321',
            'whatsapp_enabled' => true,
        ]);
    }
}
