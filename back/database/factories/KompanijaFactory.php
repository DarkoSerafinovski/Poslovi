<?php
namespace Database\Factories;
use App\Models\Kompanija;
use Illuminate\Database\Eloquent\Factories\Factory;

class KompanijaFactory extends Factory
{
    protected $model = Kompanija::class;

    public function definition()
    {
        return [
           
            'id' => 1,
            'naziv' => $this->faker->company(),
            'opis' => $this->faker->paragraph(),
            'kategorija_id' => 1,
        ];
    }
}
