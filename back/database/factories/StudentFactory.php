<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Student;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class StudentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     * 
     * 
     * 
     */

     
    protected $model = Student::class;
    public function definition(): array
    {
        return [
            'id' => 1, 
            'ime' => $this->faker->firstName(),
            'prezime' => $this->faker->lastName(),
            'fakultet' => $this->faker->word(),
            'godina_studija' => $this->faker->randomElement([1, 2, 3, 4]),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
