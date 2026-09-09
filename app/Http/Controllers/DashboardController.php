<?php

namespace App\Http\Controllers;

use App\Models\Entitlement;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the user dashboard with library, orders, and profile.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();

        // 1. Library (Entitlements)
        // Fetch all novels the user has an active entitlement for
        $library = Entitlement::with('novel:id,slug,title_ar,title_en,cover_image_path')
            ->where('user_id', $user->id)
            ->get()
            ->map(function ($entitlement) {
                $novel = $entitlement->novel;
                return [
                    'id' => $novel->id,
                    'slug' => $novel->slug,
                    'title_ar' => $novel->title_ar,
                    'title_en' => $novel->title_en,
                    'cover_url' => $novel->cover_image_path
                        ? Storage::url($novel->cover_image_path)
                        : null,
                ];
            });

        // 2. Orders History
        $orders = Order::with('novel:id,slug,title_ar,title_en')
            ->where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($order) {
                return [
                    'id' => $order->id,
                    'status' => $order->status,
                    'amount_paid' => $order->amount_paid,
                    'created_at' => $order->created_at->toIso8601String(),
                    'rejection_reason' => $order->rejection_reason,
                    'novel_slug' => $order->novel->slug ?? null,
                    'novel_title_ar' => $order->novel->title_ar ?? null,
                    'novel_title_en' => $order->novel->title_en ?? null,
                ];
            });

        // 3. Profile
        // Load the profile if it hasn't been loaded
        $user->loadMissing('profile');
        $profileData = [
            'first_name' => $user->profile->first_name ?? '',
            'last_name' => $user->profile->last_name ?? '',
            'email' => $user->email,
            'phone_number' => $user->profile->phone_number ?? '',
        ];

        return Inertia::render('Dashboard', [
            'library' => $library,
            'orders' => $orders,
            'profile' => $profileData,
        ]);
    }
}
