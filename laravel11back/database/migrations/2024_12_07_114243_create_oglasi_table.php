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
        Schema::create('oglasi', function (Blueprint $table) {
           $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('kategorija_id')->nullable();
            $table->string('naslov');
            $table->text('opis');
            $table->text('potrebna_znanja');
            $table->foreign('kategorija_id')->references('id')->on('kategorije_oglasa')->onDelete('set null');
            $table->string('lokacija');      
            $table->string('banner');     
            $table->enum('tip', ['posao', 'praksa']);    
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('oglasi');
    }
};
