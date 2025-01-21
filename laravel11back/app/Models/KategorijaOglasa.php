<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KategorijaOglasa extends Model
{
    use HasFactory;
    protected $table = 'kategorije_oglasa';


    use HasFactory;

    protected $fillable = ['naziv'];

  
}
