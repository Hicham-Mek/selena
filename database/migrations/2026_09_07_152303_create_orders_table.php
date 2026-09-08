<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->restrictOnDelete();
            $table->foreignId('novel_id')->constrained()->restrictOnDelete();
            $table->string('status', 30)->default('pending');
            $table->decimal('amount_paid', 10, 2);
            $table->string('receipt_path', 500)->nullable();
            $table->text('rejection_reason')->nullable();
            $table->timestamps();

            // Prevent duplicate active orders (pending or under_review) for the same user+novel
            $table->index(['user_id', 'novel_id', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
