<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\KategorijaKompanije;
use App\Http\Resources\KategorijaKompanijeResource;
class KategorijaKompanijeController extends Controller
{
    public function index()
    {
        try
        {
            $kategorije = KategorijaKompanije::all();
            return KategorijaKompanijeResource::collection($kategorije);
        }
        catch (\Exception $e) {
         
            return response()->json([
                'error' => 'Došlo je do greške pri izvlacenju kategorije.',
            ], 500); 
        }
    }
}
