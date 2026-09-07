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
        Schema::create('novels', function (Blueprint $table) {
            $table->id();
            $table->string('title_ar', 255);
            $table->string('title_en', 255)->nullable();
            $table->string('slug', 255)->unique();
            $table->text('description_ar');
            $table->text('description_en')->nullable();
            $table->decimal('price_dzd', 10, 2);
            $table->string('cover_image_path', 500)->nullable();
            $table->string('status', 30)->default('draft');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('novels');
    }
};
