<?php
namespace Database\Factories;
use App\Models\Oglas;
use Illuminate\Database\Eloquent\Factories\Factory;

class OglasFactory extends Factory
{
    protected $model = Oglas::class;

    public function definition()
    {
        return [
            'user_id' => 1,
            'naslov' => $this->faker->sentence(),
            'opis' => $this->faker->paragraph(),
            'potrebna_znanja' => $this->faker->words(3, true),
            'kategorija_id'=>1,
            'lokacija' => $this->faker->city(),
            'banner' => $this->faker->imageUrl(),
            'tip' => $this->faker->randomElement(['praksa', 'posao']),
        ];
    }
}
