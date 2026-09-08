<?php

namespace App\Http\Controllers;

use App\Models\Novel;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class NovelController extends Controller
{
    /**
     * Display a listing of the published novels.
     */
    public function index(): Response
    {
        $novels = Novel::published()
            ->select('id', 'title_ar', 'title_en', 'slug', 'description_ar', 'description_en', 'price_dzd', 'cover_image_path', 'status')
            ->orderBy('id', 'desc')
            ->get()
            ->map(function ($novel) {
                return [
                    'id' => $novel->id,
                    'title_ar' => $novel->title_ar,
                    'title_en' => $novel->title_en,
                    'slug' => $novel->slug,
                    'description_ar' => $novel->description_ar,
                    'description_en' => $novel->description_en,
                    'price_dzd' => $novel->price_dzd,
                    'cover_image_url' => $novel->cover_image_path ? asset('storage/' . $novel->cover_image_path) : null,
                ];
            });

        return Inertia::render('Novels/Index', [
            'novels' => $novels,
        ]);
    }
}
