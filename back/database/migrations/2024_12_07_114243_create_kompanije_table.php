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
        Schema::create('kompanije', function (Blueprint $table) {
            $table->unsignedBigInteger('id')->primary(); // ID iz `users`
            $table->string('naziv');
            $table->text('opis');
            $table->unsignedBigInteger('kategorija_id')->nullable();
            $table->string('logo');   
            $table->timestamps();
            $table->foreign('id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('kategorija_id')->references('id')->on('kategorije_kompanije')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kompanije');
    }
};
