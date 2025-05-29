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
            'title' => fake()->sentence(),
            'body' => fake()->paragraphs(10, true),
            'category' => fake()->randomElement(['nature', 'travel', 'technology']),
            'image' => 'images/posts/post_683865e427c3b.avif',
            'slug' => fake()->slug(),
        ];
    }
}
