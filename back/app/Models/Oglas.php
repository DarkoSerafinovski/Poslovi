<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Oglas extends Model
{
    use HasFactory;
    protected $table = 'oglasi';

    protected $fillable = [
        'user_id',
        'naslov',
        'opis',
        'potrebna_znanja', 
        'lokacija',        
        'banner', 
        'kategorija_id', 
        'tip',    
         
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function prijave()
    {
        return $this->hasMany(Prijava::class, 'oglas_id');
    }

    public function kategorija(){
        return $this->belongsTo(KategorijaOglasa::class,'kategorija_id');
    }
}
