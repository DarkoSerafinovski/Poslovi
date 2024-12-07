<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Kompanija;
use App\Models\Student;
use App\Models\Oglas;
use App\Models\Prijava;
use App\Models\Kategorija;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
    
        Kategorija::factory(5)->create();
        $users = User::factory(10)->create();

        
        foreach ($users as $user) {
            if ($user->type == 'S') {
                $student = Student::factory()->create([
                    'id' => $user->id
                ]);
            } elseif ($user->type == 'K') {
                $kompanija = Kompanija::factory()->create([
                    'id' => $user->id,
                    'kategorija_id' => Kategorija::inRandomOrder()->first()->id, 
                ]);

             
                $ads = Oglas::factory(3)->create([
                    'user_id' => $user->id,  
                ]);
                
               
                foreach ($ads as $ad) {
                    $prijave = Prijava::factory(2)->create([
                        'user_id' => User::where('type', 'S')->inRandomOrder()->first()->id, 
                        'oglas_id' => $ad->id, 
                    ]);
                }
            }
        }
    }
}