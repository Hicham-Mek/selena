<?php

use App\Models\User;

test('unauthenticated users are redirected from admin panel to login', function () {
    $response = $this->get('/admin');

    $response->assertRedirect('/admin/login');
});

test('non-admin users cannot access the filament admin panel', function () {
    $user = User::factory()->create([
        'is_admin' => false,
    ]);

    $response = $this->actingAs($user)->get('/admin');

    $response->assertForbidden();
});

test('admin users can access the filament admin panel', function () {
    $admin = User::factory()->create([
        'is_admin' => true,
    ]);

    $response = $this->actingAs($admin)->get('/admin');

    $response->assertSuccessful();
});
