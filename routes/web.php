<?php

use App\Http\Controllers\ChapterController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReceiptController;
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

    // ─── Orders (Authenticated) ───────────────────────────────────
    Route::get('/novels/{novel:slug}/purchase', [OrderController::class, 'create'])->name('orders.create');
    Route::post('/novels/{novel:slug}/purchase', [OrderController::class, 'store'])->name('orders.store');
    Route::get('/orders/{order}', [OrderController::class, 'show'])->name('orders.show');
    Route::post('/orders/{order}/receipt', [OrderController::class, 'uploadReceipt'])->name('orders.upload-receipt');
    Route::get('/orders/{order}/receipt', [ReceiptController::class, 'show'])->name('orders.receipt');
});

// ─── Novels & Chapters (Public) ────────────────────────────────
Route::get('/novels', [App\Http\Controllers\NovelController::class, 'index'])->name('novels.index');
Route::get('/novels/{novel:slug}', [ChapterController::class, 'showNovel'])->name('novels.show');
Route::get('/novels/{novel:slug}/chapters/{chapter}', [ChapterController::class, 'show'])->name('chapters.show');

// ─── Chapter Audio (Signed URL — expires 2 hours) ──────────────
// Protected by 'signed' middleware: expired or tampered URLs return 403.
// The signed URL is generated server-side in ChapterController::show().
Route::get('/chapters/{chapter}/audio', [ChapterController::class, 'streamAudio'])
    ->middleware('signed')
    ->name('chapters.audio');

// ─── Language Switcher ─────────────────────────────────────────
Route::post('/language', function (Request $request) {
    $request->validate(['locale' => 'required|in:ar,en']);
    $locale = $request->locale;
    session(['locale' => $locale]);
    cookie()->queue(cookie()->forever('locale', $locale));
    return back();
})->name('language.switch');

Route::get('/language/{locale}', function (string $locale) {
    if (in_array($locale, ['ar', 'en'])) {
        session(['locale' => $locale]);
        cookie()->queue(cookie()->forever('locale', $locale));
    }
    return back();
})->name('language.switch.get');

require __DIR__ . '/auth.php';
