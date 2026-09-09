<?php

namespace App\Http\Controllers;

use App\Models\Novel;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    /**
     * Show the purchase page with payment instructions.
     */
    public function create(Novel $novel): Response|RedirectResponse
    {
        /** @var User $user */
        $user = Auth::user();

        // Check if novel is published
        if (! $novel->isPublished()) {
            abort(404);
        }

        // Check if user already owns this novel
        if ($user->ownsNovel($novel)) {
            return  redirect()->route('novels.show', $novel->slug)
                ->with('info', 'You already own this novel.');
        }

        // Check if there's an active order
        $activeOrder = $user->activeOrderFor($novel);
        if ($activeOrder) {
            return redirect()->route('orders.show', $activeOrder->id);
        }

        return Inertia::render('Orders/Create', [
            'novel' => [
                'id' => $novel->id,
                'title_ar' => $novel->title_ar,
                'title_en' => $novel->title_en,
                'slug' => $novel->slug,
                'description_ar' => $novel->description_ar,
                'description_en' => $novel->description_en,
                'price_dzd' => $novel->price_dzd,
                'cover_image_path' => $novel->cover_image_path,
            ],
            'paymentInfo' => [
                'ccp_account' => config('payment.ccp.account_number'),
                'ccp_key' => config('payment.ccp.key'),
                'baridimob_rip' => config('payment.baridimob.rip'),
                'account_holder' => config('payment.account_holder'),
                'reference_instructions' => config('payment.reference_instructions'),
                'whatsapp_number' => config('payment.whatsapp_number'),
            ],
        ]);
    }

    /**
     * Store a new purchase order with optional receipt upload.
     */
    public function store(Request $request, Novel $novel)
    {
        /** @var User $user */
        $user = Auth::user();

        // Validate receipt if provided
        $request->validate([
            'receipt' => ['nullable', 'file', 'mimes:jpeg,jpg,png,pdf', 'max:5120'], // 5MB
        ]);

        // Check if novel is published
        if (! $novel->isPublished()) {
            abort(404);
        }

        // Use a transaction with locking to prevent race conditions
        $order = DB::transaction(function () use ($user, $novel, $request) {
            // Check for existing active order or ownership (with lock)
            $existingActive = Order::where('user_id', $user->id)
                ->where('novel_id', $novel->id)
                ->whereIn('status', [Order::STATUS_PENDING, Order::STATUS_UNDER_REVIEW, Order::STATUS_APPROVED])
                ->lockForUpdate()
                ->first();

            if ($existingActive) {
                return $existingActive;
            }

            // Store receipt if provided
            $receiptPath = null;
            if ($request->hasFile('receipt')) {
                $receiptPath = $request->file('receipt')->store('receipts', 'local');
            }

            // Create the order — snapshot the current price
            return Order::create([
                'user_id' => $user->id,
                'novel_id' => $novel->id,
                'status' => $receiptPath ? Order::STATUS_UNDER_REVIEW : Order::STATUS_PENDING,
                'amount_paid' => $novel->price_dzd,
                'receipt_path' => $receiptPath,
            ]);
        });

        return redirect()->route('orders.show', $order->id);
    }

    /**
     * Show the order confirmation/status page.
     */
    public function show(Order $order): Response
    {
        /** @var User $user */
        $user = Auth::user();

        // Ensure the user owns this order
        if ($order->user_id !== $user->id) {
            abort(403);
        }

        $order->load('novel');

        return Inertia::render('Orders/Show', [
            'order' => [
                'id' => $order->id,
                'status' => $order->status,
                'amount_paid' => $order->amount_paid,
                'has_receipt' => $order->hasReceipt(),
                'rejection_reason' => $order->rejection_reason,
                'created_at' => $order->created_at->toDateTimeString(),
            ],
            'novel' => [
                'id' => $order->novel->id,
                'title_ar' => $order->novel->title_ar,
                'title_en' => $order->novel->title_en,
                'slug' => $order->novel->slug,
                'cover_image_path' => $order->novel->cover_image_path,
                'price_dzd' => $order->novel->price_dzd,
            ],
            'whatsappNumber' => config('payment.whatsapp_number'),
        ]);
    }

    /**
     * Upload a receipt for an existing pending order.
     */
    public function uploadReceipt(Request $request, Order $order)
    {
        /** @var User $user */
        $user = Auth::user();

        // Ensure the user owns this order
        if ($order->user_id !== $user->id) {
            abort(403);
        }

        // Only allow uploading receipt for pending orders
        if ($order->status !== Order::STATUS_PENDING) {
            return back()->withErrors(['receipt' => 'Cannot upload receipt for this order.']);
        }

        $request->validate([
            'receipt' => ['required', 'file', 'mimes:jpeg,jpg,png,pdf', 'max:5120'], // 5MB
        ]);

        // Delete old receipt if exists
        if ($order->receipt_path && Storage::disk('local')->exists($order->receipt_path)) {
            Storage::disk('local')->delete($order->receipt_path);
        }

        $receiptPath = $request->file('receipt')->store('receipts', 'local');

        $order->update([
            'receipt_path' => $receiptPath,
            'status' => Order::STATUS_UNDER_REVIEW,
        ]);

        return redirect()->route('orders.show', $order->id);
    }
}
