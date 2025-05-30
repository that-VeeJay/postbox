<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request): JsonResponse
    {
        $passwordRegex = 'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&-])[A-Za-z\d@$!%*?&-]+$/';

        $validatedFields = $request->validate([
            'name' => ['required', 'string'],
            'username' => ['required', 'string', 'max:20', 'unique:users,username'],
            'email' => ['required', 'email', 'string', 'max:255', 'unique:users,email'],
            'password' => ['required', 'confirmed', 'min:8', $passwordRegex],
        ]);

        $user = User::create($validatedFields);

        $token = $user->createToken($request->name);

        return response()->json(['user' => $user, 'token' => $token->plainTextToken]);
    }

    public function login(Request $request): JsonResponse
    {
        $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'errors' => [
                    'email' => [
                        'The provided credentials are incorrect.'
                    ]
                ]
            ]);
        }

        $token = $user->createToken($user->name);

        return response()->json(['user' => $user, 'token' => $token->plainTextToken]);
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'You are logged out.']);
    }
}
