<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Http\Resources\PostResource;
use Illuminate\Support\Facades\Auth;
class PostController extends Controller
{
    public function index()
    {
        try {
            
            $posts = Post::orderBy('datum_i_vreme', 'desc')->paginate(3);
            return PostResource::collection($posts);
            
            
        } catch (\Exception $e) {
           
            return response()->json([
                'success' => false,
                'message' => 'Došlo je do greške prilikom dohvatanja postova.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function show($id){
        try {
            
            $post = Post::findOrFail($id);
            return new PostResource($post);
        } catch (\Exception $e) {
           
            return response()->json([
                'success' => false,
                'message' => 'Došlo je do greške prilikom dohvatanja posta.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }



    public function destroy($id)
    {
        try {
          


            $user = Auth::user();

            if($user->type!='alumni' && $user->type!='admin'){
                return response()->json([
                    'success' => false,
                    'message' => 'Niste autorizovani da obrisete post',
                ], 401);
            }

            $post = Post::findOrFail($id);
            $post->delete();

    
            return response()->json([
                'success' => true,
                'message' => 'Post uspešno obrisan.',
            ], 200); 
        }  catch (\Exception $e) {
        
            return response()->json([
                'success' => false,
                'message' => 'Došlo je do greške prilikom brisanja posta.',
                'error' => $e->getMessage(),
            ], 500); 
        }
    }


    public function store(Request $request)
    {
        try {
       


            $user = Auth::user();

            if($user->type!='alumni'){
                return response()->json([
                    'success' => false,
                    'message' => 'Niste autorizovani da kreirate post',
                ], 401);
            }

            $validatedData = $request->validate([
                'naslov' => 'required|string|max:255',
                'sadrzaj' => 'required|string',
            ]);


           
           
            $post = Post::create([
                'naslov' => $validatedData['naslov'],
                'sadrzaj' => $validatedData['sadrzaj'],
                'datum_i_vreme' => now(),
                'user_id' => $user->id,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Post uspešno kreiran.',
                'data' => new PostResource($post),
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Došlo je do greške prilikom kreiranja posta.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

}
