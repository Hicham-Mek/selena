<?php

test('user can switch language to english', function () {
    $response = $this->post('/language', [
        'locale' => 'en',
    ]);

    $response->assertSessionHas('locale', 'en');
    $response->assertCookie('locale', 'en');
    $response->assertRedirect();
});

test('user can switch language to arabic', function () {
    $response = $this->post('/language', [
        'locale' => 'ar',
    ]);

    $response->assertSessionHas('locale', 'ar');
    $response->assertCookie('locale', 'ar');
    $response->assertRedirect();
});

test('switching to unsupported language fails validation', function () {
    $response = $this->post('/language', [
        'locale' => 'fr',
    ]);

    $response->assertSessionHasErrors('locale');
});

test('default locale is arabic when no session is present', function () {
    $response = $this->get('/');

    $response->assertOk();
    expect(app()->getLocale())->toBe('ar');
});

test('session locale affects application locale and direction', function () {
    $response = $this->withSession(['locale' => 'en'])->get('/');

    $response->assertOk();
    expect(app()->getLocale())->toBe('en');
});
