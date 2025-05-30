<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Services\ImageService;
use App\Services\Slug;
use Illuminate\Http\JsonResponse;

class PostController extends Controller
{
    private const POST_LIMIT = 9;

    public function index(Request $request): JsonResponse
    {
        return match($request->query('type')) {
            'recent' => $this->recentPosts(),
            'latest' => $this->latestPosts(),
            default => response()->json(Post::with('user')->latest()->paginate(6)),
        };
    }

    public function recentPosts(): JsonResponse
    {
        $recentPosts = Post::with('user')->latest()->take(6)->get();
        return response()->json($recentPosts);
    }

    public function latestPosts(): JsonResponse
    {
        $latestPosts = Post::with('user')->latest()->skip(6)->take(self::POST_LIMIT)->get();
        return response()->json($latestPosts);
    }

    public function userPosts(int $id):JsonResponse
    {
         $posts = Post::where('user_id', $id)->select('title', 'image')->latest()->get();
         return response()->json($posts);
    }
    public function show(string $slug): JsonResponse
    {
        $post = Post::where('slug', $slug)->firstOrFail();
        return response()->json(['post' => $post, 'user' => $post->user]);
    }

    public function destroy(string $slug): JsonResponse
    {
         $post = Post::where('slug', $slug)->first();
         $post->delete();

         return response()->json(['message' => 'The posted was deleted.']);
    }

    public function store(Request $request, ImageService $imageService, Slug $slug): JsonResponse
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

        return response()->json(['post' => $post, 'user' => $post->user]);
    }
}
