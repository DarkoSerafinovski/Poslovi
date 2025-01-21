<?php

namespace App\Http\Controllers;

use App\Models\Oglas;
use App\Models\Kompanija;
use App\Http\Resources\OglasResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class OglasController extends Controller
{
    public function index(Request $request)
    {
        try {
            // Validacija parametara
            $validator = $request->validate([
                'tip' => 'nullable|string|max:255',
                 'kategorija_id' => 'nullable|integer|exists:kategorije_oglasa,id',
               
            ]);

            $query = Oglas::query();

           
            if ($request->filled('tip')) {
                $query->where('tip', 'like', '%' . $request->tip . '%');
            }

           
            if ($request->filled('kategorija_id')) {
                $query->where('kategorija_id', $request->kategorija_id);
            }

           
            $oglasi = $query->orderBy('created_at', 'desc')->paginate(10);

            return OglasResource::collection($oglasi);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Došlo je do greške prilikom obrade zahteva.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }



    public function show($id)
    {
        try {
            $user = Auth::user();
            $role=null;
            if($user->type=='admin')
            $role='admin';
            $oglas = Oglas::findOrFail($id);
            if($user->id==$oglas->user_id)
            $role='company';

            return response()->json([
                'data'=>  new OglasResource($oglas),
                'role'=>$role,
            ]);
           
        }  catch (\Exception $e) {
           
            return response()->json([
                'success' => false,
                'message' => 'Došlo je do greške prilikom obrade zahteva.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }



    public function destroy($id)
    {
        try {
          

            if(Auth::user()->type=='company'  || Auth::user()->type=='admin'){
               

                $oglas = Oglas::findOrFail($id);
                if(Auth::user()->type=='company' && $oglas->user->id!=Auth::user()->id){
                    return response()->json([
                        'success' => false,
                        'message' => 'Nije autorizovan pristup, morate biti kompanija vlasnik da bi ste obrisali oglas!!!',
                    ], 401);
                }


                $oglas->delete();
                return response()->json([
                    'success' => true,
                    'message' => 'Oglas uspešno obrisan.',
                ], 200); 
            }
            else{
                return response()->json([
                    'success' => false,
                    'message' => 'Nije autorizovan pristup, morate biti kompanija vlasnik ili admin da bi ste obrisali oglas!!!',
                ], 401);
               
            }

           
        }  catch (\Exception $e) {
        
            return response()->json([
                'success' => false,
                'message' => 'Došlo je do greške prilikom brisanja oglasa.',
                'error' => $e->getMessage(),
            ], 500); 
        }
    }




    public function store(Request $request)
    {
        try {
            if(Auth::user()->type!='company'){
                return response()->json([
                    'success' => false,
                    'message' => 'Nije autorizovan pristup, morate biti kompanija da bi ste napravili oglas!!!',
                ], 401);
            }
         
            $validatedData = $request->validate([
                'naslov' => 'required|string|max:255',
                'opis' => 'required|string',
                'potrebna_znanja' => 'required|string',
                'kategorija_id' => 'nullable|integer|exists:kategorije_oglasa,id',
                'lokacija' => 'required|string|max:255',
                'banner' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048', 
                'tip' => 'required|in:posao,praksa',
            ]);


            $kompanija = Kompanija::findOrFail(Auth::user()->id);
           
            $oglas = Oglas::create([
                'user_id' => Auth::user()->id, 
                'naslov' => $validatedData['naslov'],
                'opis' => $validatedData['opis'],
                'potrebna_znanja' => $validatedData['potrebna_znanja'],
                'kategorija_id' => $validatedData['kategorija_id'] ?? null,
                'lokacija' => $validatedData['lokacija'],
                'banner' =>  $this->uploadBanner($request->file('banner'),$validatedData['naslov'],$kompanija->naziv),
                'tip' => $validatedData['tip'],
            ]);

     
            return response()->json([
                'success' => true,
                'message' => 'Oglas je uspešno kreiran.',
                'data' => $oglas,
            ], 201);
        } catch (\Exception $e) {
          
            return response()->json([
                'success' => false,
                'message' => 'Došlo je do greške prilikom kreiranja oglasa.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }




    private function uploadBanner($file, $naziv,$kompanija)
{

    $sanitizedNaziv = preg_replace('/[^a-zA-Z0-9_-]/', '_', $kompanija);
    $path = 'app/' . $sanitizedNaziv;
    if (!Storage::exists($path)) {
        Storage::makeDirectory($path);
    }

    $sanitizedNaziv = preg_replace('/[^a-zA-Z0-9_-]/', '_', $naziv);
    $extension = $file->getClientOriginalExtension(); 
    $filename = $sanitizedNaziv . '.' . $extension;

    $path = $path . '/'. $sanitizedNaziv;
    if(!Storage::exists($path)){
        Storage::makeDirectory($path);
    }
    $pathFile = $file->storeAs($path, $filename,'public');

    return Storage::url($pathFile);
}

}
