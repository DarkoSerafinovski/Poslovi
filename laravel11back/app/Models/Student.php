<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;
    protected $table = 'studenti';


    protected $fillable = [
        'id',
        'ime',
        'prezime',
        'fakultet',
        'godina_studija',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id');
    }
}
