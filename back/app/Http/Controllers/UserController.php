<?php
 
 namespace App\Http\Controllers;

 use App\Models\User;
 use App\Models\Prijava;
 use Illuminate\Http\Request;
 use App\Http\Resources\UserResource;
 use App\Http\Resources\OglasResource;
 use App\Http\Resources\PrijavaResource;
 use Illuminate\Support\Facades\Auth;
 use Illuminate\Support\Facades\Log;
 
 class UserController extends Controller
 {
     

     public function index(Request $request)
     {
        
        try {
           
            return UserResource::collection(User::all());

        } catch (Exception $e) {
           
            return response()->json([
                'message' => 'Došlo je do greške prilikom učitavanja korisnika.',
                'error' => $e->getMessage()
            ], 500); 
        }
    }


    public function vratiStudente()
    {
        try {
           
            $studenti = User::where('type', 'student')->paginate(5);
            return UserResource::collection($studenti);
    
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Došlo je do greške prilikom učitavanja korisnika.',
                'error' => $e->getMessage()
            ], 500); 
        }
    }
    

    public function destroy($userId)
    {
        try {
            
            if(Auth::user()->type!='admin'){
                return response()->json([
                    'success' => false,
                    'message' => 'Nije autorizovan pristup, morate biti administrator da bi ste obrisali studenta!!!',
                ], 401);
            }

            $user = User::findOrFail($userId);
            $user->delete();
            return response()->json([
                'message' => 'Korisnik uspešno obrisan.'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Došlo je do greške prilikom brisanja korisnika.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
     


    public function prijave(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'status' => 'nullable|string|in:odbijeno,prihvaceno,na cekanju'
            ]);
    
            $user = Auth::user();
    
            $query = Prijava::where('user_id', $user->id);
    
            // Ako je status poslat, dodajte ga kao uslov
            if ($request->status) {
                $query->where('status', $validatedData['status']);
            }
    
            $prijave = $query->orderBy('datum_i_vreme', 'desc')->paginate(5);
    
            return PrijavaResource::collection($prijave);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Došlo je do greške prilikom uzimanja prijava korisnika.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
    
   


    public function oglasi(){
        try {
            
  
            $user = Auth::user();
            return  OglasResource::collection($user->nasiOglasi);
            

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Došlo je do greške prilikom uzimanja oglasa korisnika.',
                'message' => $e->getMessage(),
            ], 500);
        }

    }
   



    

     
 }