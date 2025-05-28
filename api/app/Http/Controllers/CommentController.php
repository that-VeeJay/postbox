<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use App\Models\Comment;

class CommentController extends Controller
{
    public function index(Post $post)
    {
    $comments = Comment::where('post_id', $post->id)
            ->whereNull('parent_id')
            ->with('replies.user', 'user')
            ->orderBy('created_at', 'desc')
            ->get();

    return response()->json($comments, 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'post_id'   => ['required','exists:posts,id'],
            'body'      => ['required', 'string'],
            'user_id'   => ['required'],
            'parent_id' => ['nullable', 'exists:comments,id'],
        ]);

        $comment = Comment::create([
            'post_id'   => $validated['post_id'],
            'user_id'   => $validated['user_id'],
            'body'      => $validated['body'],
            'parent_id' => $validated['parent_id'] ?? null,
        ]);

        return response()->json(['id' => $comment->id], 201);
    }

    public function update(Request $request, Comment $comment)
    {
        $validated = $request->validate([
            'body' => ['required', 'string'],
        ]);

        $comment->update([
            'body' => $validated['body'],
        ]);

        return response()->json(['success' => true], 200);
    }

    public function destroy(Comment $comment)
    {
        $comment->delete();
        return response()->json(['success' => true], 200);
    }
}
