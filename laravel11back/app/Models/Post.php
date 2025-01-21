<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $table = 'postovi';

    protected $fillable = [
        'naslov',
        'sadrzaj',
        'datum_i_vreme',
        'user_id',
    ];


    protected $casts = [
        'datum_i_vreme' => 'datetime', 
    ];
 
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
