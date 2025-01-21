<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Prijava extends Model
{
    use HasFactory;
    protected $table = 'prijave';

    use HasFactory;

    protected $fillable = [
        'user_id',
        'oglas_id',
        'datum_i_vreme',
        'fajl',
        'status'
    ];

    protected $casts = [
        'datum_i_vreme' => 'datetime', 
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function oglas()
    {
        return $this->belongsTo(Oglas::class);
    }
}
