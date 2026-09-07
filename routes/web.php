<?php

use App\Http\Controllers\AudioStreamController;
use App\Http\Controllers\ChapterController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// ─── Novels & Chapters (Public) ────────────────────────────────
Route::get('/novels/{novel:slug}', [ChapterController::class, 'showNovel'])->name('novels.show');
Route::get('/novels/{novel:slug}/chapters/{chapter}', [ChapterController::class, 'show'])->name('chapters.show');
Route::get('/chapters/{chapter}/audio', [AudioStreamController::class, 'stream'])->name('chapters.audio');

// ─── Language Switcher ─────────────────────────────────────────
Route::post('/language', function (Request $request) {
    $request->validate(['locale' => 'required|in:ar,en']);
    $locale = $request->locale;
    session(['locale' => $locale]);
    cookie()->queue(cookie()->forever('locale', $locale));
    return back();
})->name('language.switch');

require __DIR__ . '/auth.php';
