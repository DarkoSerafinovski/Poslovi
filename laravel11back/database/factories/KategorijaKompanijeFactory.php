<?php
namespace Database\Factories;
use App\Models\KategorijaKompanije;
use Illuminate\Database\Eloquent\Factories\Factory;

class KategorijaKompanijeFactory extends Factory
{
    protected $model = KategorijaKompanije::class;

    public function definition()
    {
        return [
           'naziv' => $this->faker->word(),
        ];
    }
}
