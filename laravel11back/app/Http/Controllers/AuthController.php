<?php
 
namespace App\Http\Controllers;
 
use App\Models\User;
use App\Models\Student;
use App\Models\Kompanija;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
 
class AuthController extends Controller
{
   

    public function register(Request $request)
{
    $validator = Validator::make($request->all(), [
        'username' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users',
        'password' => 'required|string|min:8',
        'role' => 'required|string|in:student,alumni,company',
     
        'ime' => 'required_if:role,student|string|max:255',
        'prezime' => 'required_if:role,student|string|max:255',
        'fakultet' => 'required_if:role,student|string|max:255',
        'godina_studija' => 'required_if:role,student|integer|min:1|max:5',

        'naziv' => 'required_if:role,company|string|max:255',
        'opis' => 'required_if:role,company|string|max:500',
        'kategorija_id' => 'required_if:role,company|exists:kategorije_kompanije,id',
        'logo' => 'required_if:role,company|image|mimes:jpeg,png,jpg,gif,svg|max:2048', 
    ]);

    if ($validator->fails()) {
        return response()->json(['success' => false, 'data' => $validator->errors()]);
    }

  
    $user = User::create([
        'username' => $request->username,
        'email' => $request->email,
        'password' => Hash::make($request->password),
        'type' => $request->role,
    ]);

    
    if ($user->type === 'student') {
        Student::create([
            'id' => $user->id,
            'ime' => $request->ime,
            'prezime' => $request->prezime,
            'fakultet' => $request->fakultet,
            'godina_studija' => $request->godina_studija,
        ]);
    } elseif ($user->type === 'company') {
        Kompanija::create([
            'id' => $user->id,
            'naziv' => $request->naziv,
            'opis' => $request->opis,
            'kategorija_id' => $request->kategorija_id,
            'logo' => $this->uploadLogo($request->file('logo'),$request->naziv),
        ]);
    }

    
    $token = $user->createToken('auth_token')->plainTextToken;

   
    return response()->json([
        'success' => true,
        'data' => new UserResource($user),
        'access_token' => $token,
        'token_type' => 'Bearer',
    ]);
}
 


private function uploadLogo($file, $naziv)
{
  
    $sanitizedNaziv = preg_replace('/[^a-zA-Z0-9_-]/', '_', $naziv);
    $extension = $file->getClientOriginalExtension(); 
    $filename = $sanitizedNaziv . '.' . $extension;


    $path = 'app/' . $sanitizedNaziv;

  
    if (!Storage::exists($path)) {
        Storage::makeDirectory($path);
    }

    $pathFile = $file->storeAs($path, $filename,'public');

    return Storage::url($pathFile);
}

    public function login(Request $request)
    {

        \Log::info('Login attempt: ', ['email' => $request->email, 'password' => $request->password]);
        
        if(!Auth::attempt($request->only('email','password'))){
            return response()->json(['success'=> false]);
        }
 
        $user = User::where('email', $request['email'])->firstOrFail();
       
        $token = $user->createToken('auth_token')->plainTextToken;
        \Log::info($token);
        return response()->json(['success'=>true,'data'=> $user, 'access_token'=> $token, 'token_type'=> 'Bearer','role'=>$user->type]);
    }
 
    public function logout(Request $request)
    {
       $request->user()->tokens()->delete();
       return response()->json(['message'=> 'Successfully logged out!']);
    }
}