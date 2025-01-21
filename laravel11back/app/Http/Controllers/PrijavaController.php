<?php

namespace App\Http\Controllers;

use App\Models\Prijava;
use App\Models\Oglas;
use App\Models\Kompanija;
use App\Models\Student;
use App\Http\Resources\PrijavaResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
class PrijavaController extends Controller
{
    public function update(Request $request, $id)
    {
        try {
         

            $prijava = Prijava::findOrFail($id);
            $user = Auth::user();
            if($prijava->oglas->user->id!=$user->id){
                return response()->json([
                    'success' => false,
                    'message' => 'Nije autorizovan pristup, morate biti vlasnik oglasa da bi ste izmenili status prijave!!!',
                ], 401);
            }

            $validatedData = $request->validate([
                'status' => 'required|string|in:na cekanju,odbijeno,prihvaceno',
            ]);

         

           
            $prijava->update([
                'status' => $validatedData['status'],
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Status prijave uspešno ažuriran.',
                'data' => new PrijavaResource($prijava),
            ]);
        
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Došlo je do greške prilikom ažuriranja prijave.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }


    public function store(Request $request)
    {
        try {
           
            if(Auth::user()->type!='student'){
                return response()->json([
                    'success' => false,
                    'message' => 'Nije autorizovan pristup, morate biti student da bi ste poslali prijavu za oglas!!!',
                ], 401);
            }
           
            $validatedData = $request->validate([
                'oglas_id' => 'required|integer|exists:oglasi,id',
                'fajl' => 'required|mimes:pdf',
            ]);

        


          
            $prijava = Prijava::create([
                'user_id' => Auth::user()->id, 
                'oglas_id' => $validatedData['oglas_id'],
                'datum_i_vreme' => now(),
                'fajl' => $this->uploadFile($request->file('fajl'),$validatedData['oglas_id']),
                'status' => 'na cekanju', 
            ]);

          
            return response()->json([
                'success' => true,
                'message' => 'Prijava je uspešno kreirana.',
                'data' => $prijava,
            ], 201);
        }  catch (\Exception $e) {
           
            return response()->json([
                'success' => false,
                'message' => 'Došlo je do greške prilikom kreiranja prijave.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }



    private function uploadFile($file,$oglas_id)
    {
        $oglas = Oglas::findOrFail($oglas_id);
        $user = Auth::user();
        $student = Student::findOrFail($user->id);

        $kompanija = Kompanija::findOrFail($oglas->user->id);

        $sanitizedNaziv = preg_replace('/[^a-zA-Z0-9_-]/', '_', $kompanija->naziv);
        $path = 'app/' . $sanitizedNaziv;

      
        if (!Storage::exists($path)) {
            Storage::makeDirectory($path);
        }
    
        $sanitizedNaziv = preg_replace('/[^a-zA-Z0-9_-]/', '_', $oglas->naslov);
        $path = $path . '/'. $sanitizedNaziv;
        if(!Storage::exists($path)){
            Storage::makeDirectory($path);
        }

        $path = $path . '/' . $student->ime . '_' . $student->prezime;
        if(!Storage::exists($path)){
            Storage::makeDirectory($path);
        }

        $extension = $file->getClientOriginalExtension(); 
        $filename =$student->ime . '_' . $student->prezime . '.' . $extension;
        $pathFile = $file->storeAs($path, $filename,'public');
    
        return Storage::url($pathFile);
    }

}
