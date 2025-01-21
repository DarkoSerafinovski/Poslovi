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
        Schema::table('studenti', function (Blueprint $table) {
            $table->integer('godina_studija')->after('fakultet');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('studenti', function (Blueprint $table) {
            $table->dropColumn('godina_studija');
        });
    }
};
