<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class PostFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'category' => fake()->randomElement(['nature', 'travel', 'technology']),
            'title' => fake()->sentence(),
            'body' => fake()->paragraph(),
            'image' => 'https://placehold.co/600x400',
        ];
    }
}
