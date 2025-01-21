<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KategorijaKompanije extends Model
{
    use HasFactory;
    protected $table = 'kategorije_kompanije';


    use HasFactory;

    protected $fillable = ['naziv'];

  
}
