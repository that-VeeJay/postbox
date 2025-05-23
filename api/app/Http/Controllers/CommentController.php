<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;

class CommentController extends Controller
{
    public function index($postId)
    {
    $comments = Comment::where('post_id', $postId)
            ->whereNull('parent_id')
            ->with('replies.user', 'user')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function($comment) {
                $comment->is_edited = $comment->updated_at > $comment->created_at;
                return $comment;
            });

    return response()->json($comments);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'post_id'   => ['required','exists:posts,id'],
            'body'      => ['required', 'string'],
            'user_id'   => ['required'],
            'parent_id' => ['nullable', 'exists:comments,id'],
        ]);

        Comment::create([
            'post_id'   => $validated['post_id'],
            'user_id'   =>  $validated['user_id'],
            'body'      => $validated['body'],
            'parent_id' => $validated['parent_id'] ?? null,
        ]);

        return response()->json(['message' => 'Comment posted!']);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'body' => ['required', 'string'],
        ]);

        $comment = Comment::find($id);

        $comment->body = $validated['body'];
        $comment->save();

        return response()->json(['message' => 'Comment updated successfully']);
    }

    public function destroy(Comment $comment)
    {
        $comment->delete();
        return ['message' => 'The post was deleted'];
    }

    public function storeReply(Request $request)
    {
        $validated = $request->validate([
            'post_id'   => ['required'],
            'body'      => ['required'],
            'user_id'   => ['required'],
            'parent_id' => ['required'],
        ]);

        Comment::create([
            'post_id'   => $validated['post_id'],
            'user_id'   =>  $validated['user_id'],
            'body'      => $validated['body'],
            'parent_id' => $validated['parent_id'],
        ]);

        return response()->json(['message' => 'Reply posted!']);
    }

    public function showReply($commentId)
    {
        $replies = Comment::where('parent_id', $commentId)
            ->with('user')
            ->latest()
            ->get();

        return response()->json($replies);
    }

    public function checkRepliesExist($commentId)
    {
        $hasReplies = Comment::where('parent_id', $commentId)->exists();

        return response()->json(['hasReplies' => $hasReplies]);
    }
}
