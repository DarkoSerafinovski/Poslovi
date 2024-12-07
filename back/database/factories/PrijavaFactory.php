<?php
namespace Database\Factories;
use App\Models\Prijava;
use App\Models\User;
use App\Models\Oglas;
use Illuminate\Database\Eloquent\Factories\Factory;

class PrijavaFactory extends Factory
{
    protected $model = Prijava::class;

    public function definition()
    {
        return [
            'user_id' =>1, 
            'oglas_id' => 1,
            'datum_i_vreme' => $this->faker->dateTime(),
            'fajl' => $this->faker->word() . '.pdf',
            'status' => $this->faker->randomElement(['na cekanju','odbijeno','prihvaceno']),
        ];
    }
}
