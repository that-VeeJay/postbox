<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;

class PostController extends Controller
{
    private const POST_LIMIT = 9;

    public function index()
    {
        return Post::with('user')->latest()->take(self::POST_LIMIT)->get();
    }

    public function store(Request $request)
    {
        $validatedFields = $request->validate([
            'title' => ['required'],
            'body' => ['required'],
            'category' => ['required'],
            'image' => ['required'],
        ]);

        return $validatedFields;

    }
}
