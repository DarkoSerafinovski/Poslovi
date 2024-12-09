<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kompanija extends Model
{
    use HasFactory;
    protected $table = 'kompanije';


    protected $fillable = [
        'id',
        'naziv',
        'opis',
        'kategorija_id',
        'logo',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id');
    }


    public function kategorija()
{
    return $this->belongsTo(KategorijaKompanije::class, 'kategorija_id');
}

    



}
