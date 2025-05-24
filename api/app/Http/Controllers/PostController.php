<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Services\ImageService;


class PostController extends Controller
{
    private const POST_LIMIT = 9;

    public function index()
    {
        return Post::with('user')
            ->latest()
            ->take(self::POST_LIMIT)
            ->get();
    }

    public function show(Post $post)
    {
         return [
            'post' => $post,
            'user' => $post->user
        ];
    }

    public function destroy(Post $post)
    {
         $post->delete();
         return response()->json(['message' => 'The posted was deleted.']);
    }

    public function store(Request $request, ImageService $imageService)
    {
        $validated = $request->validate([
            'title'    => ['required'],
            'body'     => ['required'],
            'category' => ['required'],
            'image'    => ['required', 'image', 'mimes:png,jpg,jpeg'],
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $imageService->compressAndStore($request->file('image'), 'images/posts');
            $validated['image'] = $imagePath;
        }

        $post = $request->user()->posts()->create($validated);

        return ['post' => $post, 'user' => $post->user];
    }

    public function getUserPosts($id)
    {
         $posts = Post::where('user_id', $id)
            ->select('title', 'image')
            ->latest()
            ->get();
         return $posts;
    }
}
