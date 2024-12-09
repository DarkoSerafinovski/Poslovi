<?php
namespace Database\Factories;
use App\Models\KategorijaOglasa;
use Illuminate\Database\Eloquent\Factories\Factory;

class KategorijaOglasaFactory extends Factory
{
    protected $model = KategorijaOglasa::class;

    public function definition()
    {
        return [
           'naziv' => $this->faker->word(),
        ];
    }
}
