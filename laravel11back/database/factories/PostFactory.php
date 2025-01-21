<?php
namespace Database\Factories;
use App\Models\Post;
use Illuminate\Database\Eloquent\Factories\Factory;

class PostFactory extends Factory
{
    protected $model = Post::class;

    public function definition()
    {
        return [
            'user_id' => 1,
            'naslov' => $this->faker->sentence(),
            'sadrzaj' => $this->faker->paragraph(),
            'datum_i_vreme'=>$this->faker->dateTime(),
        ];
    }
}
