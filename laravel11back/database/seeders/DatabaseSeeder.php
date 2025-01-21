<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Kompanija;
use App\Models\Student;
use App\Models\Oglas;
use App\Models\Prijava;
use App\Models\KategorijaKompanije;
use App\Models\KategorijaOglasa;
use App\Models\Post;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
    
        KategorijaKompanije::factory(5)->create();
        KategorijaOglasa::factory(5)->create();
        $users = User::factory(30)->create();

        
        foreach ($users as $user) {
            if ($user->type == 'student') {
                $student = Student::factory()->create([
                    'id' => $user->id
                ]);
            } elseif ($user->type == 'company') {
                $kompanija = Kompanija::factory()->create([
                    'id' => $user->id,
                    'kategorija_id' => KategorijaKompanije::inRandomOrder()->first()->id, 
                ]);

             
                $ads = Oglas::factory(3)->create([
                    'user_id' => $user->id,  
                    'kategorija_id' => KategorijaOglasa::inRandomOrder()->first()->id, 
                ]);
                
               
                foreach ($ads as $ad) {
                    $prijave = Prijava::factory(1)->create([
                        'user_id' => User::where('type', 'student')->inRandomOrder()->first()->id, 
                        'oglas_id' => $ad->id, 
                    ]);
                }
            }
            elseif($user->type== 'alumni'){
                Post::factory(3)->create([
                    'user_id'=>$user->id
                ]);
            }
        }
    }
}
