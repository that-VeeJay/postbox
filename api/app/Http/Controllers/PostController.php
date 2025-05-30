<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Services\ImageService;
use App\Services\Slug;


class PostController extends Controller
{
    private const POST_LIMIT = 9;

    public function getAllPosts()
    {
        return Post::with('user')
            ->latest()
            ->paginate(6);
    }

    public function getRecentPosts()
    {
        return Post::with('user')
            ->latest()
            ->take(6)
            ->get();
    }

    public function getLatestPosts()
    {
        return Post::with('user')
            ->latest()
            ->skip(6)
            ->take(self::POST_LIMIT)
            ->get();
    }

    public function show($slug)
    {
        $post = Post::where('slug', $slug)->firstOrFail();
        return [
            'post' => $post,
            'user' => $post->user
        ];
    }

    public function destroy($slug)
    {
         $post = Post::where('slug', $slug)->first();
         $post->delete();
         return response()->json(['message' => 'The posted was deleted.']);
    }

    public function store(Request $request, ImageService $imageService, Slug $slug)
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

        $validated['slug'] = $slug->generateUniqueSlug($validated['title']);

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
