<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ReceiptController extends Controller
{
    /**
     * Securely serve a receipt file from private storage.
     * Only the order owner or an admin can view it.
     */
    public function show(Order $order): StreamedResponse
    {
        $user = auth()->user();

        // Only the order owner or an admin can view receipts
        if ($order->user_id !== $user->id && ! $user->isAdmin()) {
            abort(403);
        }

        if (! $order->receipt_path || ! Storage::disk('local')->exists($order->receipt_path)) {
            abort(404);
        }

        $path = Storage::disk('local')->path($order->receipt_path);
        $mimeType = Storage::disk('local')->mimeType($order->receipt_path);

        return response()->stream(function () use ($path) {
            $stream = fopen($path, 'rb');
            fpassthru($stream);
            fclose($stream);
        }, 200, [
            'Content-Type' => $mimeType,
            'Content-Disposition' => 'inline',
            'Cache-Control' => 'private, max-age=3600',
        ]);
    }
}
