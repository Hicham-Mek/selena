<?php

use App\Models\Chapter;
use App\Models\Entitlement;
use App\Models\Novel;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function () {
    $this->novel = Novel::create([
        'title_ar'       => 'رواية سحرية',
        'title_en'       => 'Magical Novel',
        'slug'           => 'magical-novel',
        'description_ar' => 'وصف الرواية السحرية',
        'price_dzd'      => 800.00,
        'status'         => 'published',
    ]);

    $this->previewChapter = Chapter::create([
        'novel_id'       => $this->novel->id,
        'chapter_number' => 1,
        'title'          => 'الفصل الأول - المعاينة',
        'title_en'       => 'Chapter 1 - Preview',
        'content_text'   => '<p>محتوى مجاني للمعاينة</p>',
        'is_preview'     => true,
    ]);

    $this->paidChapter = Chapter::create([
        'novel_id'       => $this->novel->id,
        'chapter_number' => 2,
        'title'          => 'الفصل الثاني - مدفوع',
        'title_en'       => 'Chapter 2 - Paid',
        'content_text'   => '<p>محتوى مدفوع بالكامل</p>',
        'is_preview'     => false,
    ]);
});

test('guest can access preview chapter', function () {
    $response = $this->get(route('chapters.show', [
        'novel'   => $this->novel->slug,
        'chapter' => $this->previewChapter->id,
    ]));

    $response->assertStatus(200);
    $response->assertInertia(fn (Assert $page) => $page
        ->component('Chapters/Show')
        ->where('chapter.id', $this->previewChapter->id)
        ->where('isOwned', false)
    );
});

test('guest cannot access paid chapter and is redirected', function () {
    $response = $this->get(route('chapters.show', [
        'novel'   => $this->novel->slug,
        'chapter' => $this->paidChapter->id,
    ]));

    $response->assertRedirect(route('novels.show', $this->novel->slug));
    $response->assertSessionHas('error');
});

test('unentitled authenticated user cannot access paid chapter', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->get(route('chapters.show', [
        'novel'   => $this->novel->slug,
        'chapter' => $this->paidChapter->id,
    ]));

    $response->assertRedirect(route('novels.show', $this->novel->slug));
    $response->assertSessionHas('error');
});

test('entitled user can access paid chapter and receives isOwned flag', function () {
    $user = User::factory()->create();

    Entitlement::create([
        'user_id'    => $user->id,
        'novel_id'   => $this->novel->id,
        'granted_at' => now(),
    ]);

    $response = $this->actingAs($user)->get(route('chapters.show', [
        'novel'   => $this->novel->slug,
        'chapter' => $this->paidChapter->id,
    ]));

    $response->assertStatus(200);
    $response->assertInertia(fn (Assert $page) => $page
        ->component('Chapters/Show')
        ->where('chapter.id', $this->paidChapter->id)
        ->where('isOwned', true)
    );
});

test('novel show page supplies purchaseStatus owned to entitled user', function () {
    $user = User::factory()->create();

    Entitlement::create([
        'user_id'    => $user->id,
        'novel_id'   => $this->novel->id,
        'granted_at' => now(),
    ]);

    $response = $this->actingAs($user)->get(route('novels.show', $this->novel->slug));

    $response->assertStatus(200);
    $response->assertInertia(fn (Assert $page) => $page
        ->component('Novels/Show')
        ->where('purchaseStatus', 'owned')
        ->has('novel.chapters', 2)
    );
});
