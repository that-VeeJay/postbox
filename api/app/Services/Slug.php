<?php

namespace App\Services;

use App\Models\Post;
use Illuminate\Support\Str;

class Slug
{
    public static function generateUniqueSlug($title)
    {
        $slug = Str::slug($title);
        $original = $slug;
        $count = 1;

        while (Post::where('slug', $slug)->exists()) {
            $slug = $original . '-' . $count++;
        }

        return $slug;
    }
}
