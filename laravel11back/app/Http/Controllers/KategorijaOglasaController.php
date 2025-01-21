<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\KategorijaOglasa;
use App\Http\Resources\KategorijaOglasaResource;
use Illuminate\Support\Facades\Auth;

class KategorijaOglasaController extends Controller
{
    public function index()
    {
        $kategorije = KategorijaOglasa::all(); 
        return KategorijaOglasaResource::collection($kategorije);
        
    }


    public function store(Request $request)
    {
        
        
        try {

            if(Auth::user()->type!='admin'){
                return response()->json([
                    'success' => false,
                    'message' => 'Nije autorizovan pristup, morate biti administrator da bi ste napravili kategoriju!!!',
                ], 401);
            }
            $validated = $request->validate([
                'naziv' => 'required|string|max:255|unique:kategorije_oglasa,naziv',
            ]);
            $kategorija = KategorijaOglasa::create([
                'naziv' => $validated['naziv'], 
            ]);

          
            return response()->json([
                'message' => 'Kategorija uspešno dodata!',
                'data' => $kategorija,
            ], 201); 
        } catch (\Exception $e) {
         
            return response()->json([
                'error' => 'Došlo je do greške pri dodavanju kategorije.',
            ], 500); 
        }
    }



    public function destroy($id){
        try{

            if(Auth::user()->type!='admin'){
                return response()->json([
                    'success' => false,
                    'message' => 'Nije autorizovan pristup, morate biti administrator da bi ste obrisali kategoriju!!!',
                ], 401);
            }

            $category = KategorijaOglasa::findOrFail($id);
            $category->delete();

        }catch (\Exception $e) {
         
            return response()->json([
                'error' => 'An error occurred while deleting the category.',
            ], 500); 
        }
    }

}
