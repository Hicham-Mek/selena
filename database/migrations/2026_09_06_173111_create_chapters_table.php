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
        Schema::create('chapters', function (Blueprint $table) {
            $table->id();
            $table->foreignId('novel_id')->constrained()->cascadeOnDelete();
            $table->unsignedInteger('chapter_number');
            $table->string('title', 255);
            $table->string('title_en', 255)->nullable();
            $table->longText('content_text');
            $table->string('audio_path', 500)->nullable();
            $table->boolean('is_preview')->default(false);
            $table->timestamps();

            $table->unique(['novel_id', 'chapter_number']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chapters');
    }
};
