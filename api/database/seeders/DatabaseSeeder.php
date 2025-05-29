<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Vee Jay Omisol',
            'username' => 'veejayomisol',
            'email' => 'vee@gmail.com',
            'password' => '123',
        ]);

        User::factory()->create([
            'name' => 'Meljene Laquio',
            'username' => 'meloath',
            'email' => 'mel@gmail.com',
            'password' => '123',
        ]);

        Post::factory(50)->create();
    }
}
