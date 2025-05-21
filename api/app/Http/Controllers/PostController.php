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

    public function show(Post $post)
    {
         return ['post' => $post, 'user' => $post->user];
    }

    public function store(Request $request)
    {
        $validatedFields = $request->validate([
            'title' => ['required'],
            'body' => ['required'],
            'category' => ['required'],
            'image' => ['required','image','mimes:png,jpg,jpeg'],
        ]);

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $image_name = uniqid('post_') . '.' . $image->getClientOriginalExtension();
            // Save to storage/app/public/images/posts
            $image->storeAs('public/images/posts', $image_name);
            // Also save to public/images/posts
            $public_path = public_path('images/posts');
            if (!file_exists($public_path)) {
                mkdir($public_path, 0755, true);
            }
            $image->move($public_path, $image_name);
            // Save the relative path for frontend access
            $validatedFields['image'] = 'images/posts/' . $image_name;
        }

        $post = $request->user()->posts()->create($validatedFields);

        return ['post' => $post, 'user' => $post->user];
    }

    public function getPosts($id)
    {
         $posts = Post::where('user_id', $id)->select('title', 'image')->latest()->get();
         return $posts;
    }

    public function destroy(Post $post)
    {
         $post->delete();
         return ['message' => 'The post was deleted'];
    }
}
