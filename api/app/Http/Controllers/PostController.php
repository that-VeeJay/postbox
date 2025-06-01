<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Services\ImageService;
use App\Services\SlugService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    private const PAGINATE = 6;
    private const RECENT_POSTS = 6;
    private const SKIP_POSTS = 6;
    private const LATEST_POSTS = 9;

    public function index(Request $request): JsonResponse
    {
        return match($request->query('type')) {
            'recent' => $this->recentPosts(),
            'latest' => $this->latestPosts(),
            'featured' => $this->featuredPost(),
            default => response()
                        ->json(Post::with('user')
                        ->latest()
                        ->paginate(self::PAGINATE)
            ),
        };
    }

    public function featuredPost()
    {
        $featuredPost = Post::with('user')
            ->inRandomOrder()
            ->first();

        return response()->json($featuredPost);
    }

    public function recentPosts(): JsonResponse
    {
        $recentPosts = Post::with('user')
            ->latest()
            ->take(self::RECENT_POSTS)
            ->get();

        return response()->json($recentPosts);
    }

    public function latestPosts(): JsonResponse
    {
        $latestPosts = Post::with('user')
            ->latest()
            ->skip(self::SKIP_POSTS)
            ->take(self::LATEST_POSTS)
            ->get();

        return response()->json($latestPosts);
    }

    public function userPosts(int $id):JsonResponse
    {
        $posts = Post::where('user_id', $id)
            ->select('title', 'image')
            ->latest()
            ->get();

        return response()->json($posts);
    }

    public function show(string $slug): JsonResponse
    {
        $user = Auth::user();
        $post = Post::where('slug', $slug)
            ->withCount('likes')
            ->firstOrFail();

        $liked = false;

        if($user) {
            $liked = $user->likes()
                ->where('post_id', $post->id)
                ->exists();
        }

        return response()->json([
            'post' => $post,
            'user' => $post->user,
            'liked_by_current_user' => $liked
        ]);
    }

    public function destroy(string $slug): JsonResponse
    {
         $post = Post::where('slug', $slug)->first();
         $post->delete();

         return response()->json([
            'message' => 'The posted was deleted.'
        ]);
    }

    public function store(Request $request, ImageService $imageService, SlugService $slug): JsonResponse
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

        $post = $request
            ->user()
            ->posts()
            ->create($validated);

        return response()->json(['post' => $post, 'user' => $post->user]);
    }
}
