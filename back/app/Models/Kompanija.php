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
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id');
    }


    public function category()
{
    return $this->belongsTo(Kategorija::class, 'kategorija_id');
}



}
