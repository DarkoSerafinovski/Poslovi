<?php

namespace App\Http\Controllers;

use App\Models\Kompanija;
use App\Http\Resources\KompanijaResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Illuminate\Http\Request;

class KompanijaController extends Controller
{
    public function index(Request $request)
{
    try {
      
        $validator = $request->validate([
            'naziv' => 'nullable|string|max:255',
            'kategorija' => 'nullable|array',
            'kategorija.id' => 'required_with:kategorija|integer|exists:kategorije_kompanije,id',
            'kategorija.naziv' => 'nullable|string|max:255',
        ]);

       
        $query = Kompanija::query();

      
        if ($request->filled('naziv')) {
            $query->where('naziv', 'like', '%' . $request->naziv . '%');
        }

      
        if ($request->filled('kategorija.id')) {
            $query->where('kategorija_id', $request->input('kategorija.id'));
        }

        if (!$request->filled('naziv') && !$request->filled('kategorija')) {
            $query->orderBy('naziv', 'asc');
        }
      
        $kompanije = $query->paginate(10);

        return  KompanijaResource::collection($kompanije);
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
             $kompanija = Kompanija::findOrFail($id);
            return new KompanijaResource($kompanija);
      
    } catch (\Exception $e) {

        return response()->json([
            'success' => false,
            'message' => 'Došlo je do greške prilikom učitavanja podataka o kompaniji.',
            'error' => $e->getMessage(),
        ], 500);
    }
}




public function update(Request $request, $id)
    {
        try {
         
            if(Auth::user()->id!=$id){
                return response()->json([
                    'success' => false,
                    'message' => 'Nije autorizovan pristup, morate biti vlasnik kompanija da bi ste izmenili podatke!!!',
                ], 401);
            }
            $kompanija = Kompanija::findOrFail($id);

            $validatedData = $request->validate([
                'naziv' => 'required|string|max:255',
                'email' => 'required|email|max:255',
                'kategorija_id' => 'nullable|integer|exists:kategorije_kompanije,id',
                'opis' => 'required|string',
                'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', 
            ]);

          
            if ($request->hasFile('logo')) {
                if (File::exists($kompanija->logo)) {
                    File::delete($kompanija->logo);
                }
                $kompanija->logo =  $this->uploadLogo($request->file('logo'), $request->naziv);
            }

          
            $kompanija->naziv = $validatedData['naziv'];
            $kompanija->opis = $validatedData['opis'];
            $kompanija->kategorija_id=$validatedData['kategorija_id'];
            $kompanija->user->email = $validatedData['email'];
            $kompanija->save();

        
            return response()->json([
                'success' => true,
                'message' => 'Podaci o kompaniji su uspešno ažurirani.',
                'data' => $kompanija,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Došlo je do greške prilikom ažuriranja kompanije.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }


    private function uploadLogo($file, $naziv)
{
  
    $sanitizedNaziv = preg_replace('/[^a-zA-Z0-9_-]/', '_', $naziv);
    $extension = $file->getClientOriginalExtension(); 
    $filename = $sanitizedNaziv . '.' . $extension;


    $path = 'public/app/' . $sanitizedNaziv;

  
    if (!Storage::exists($path)) {
        Storage::makeDirectory($path);
    }

    $pathFile = $file->storeAs($path, $filename);

    return Storage::url($pathFile);
}


}
