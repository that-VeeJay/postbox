<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // TODO: Add validation in production
    // Change password length
    // Required at least 1 uppercase, 1 lowercase, 1 number, and 1 special characters
    // 'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/'

    public function register(Request $request)
    {
        $validatedFields = $request->validate([
            'name' => ['required', 'string'],
            'username' => ['required', 'string', 'max:20', 'unique:users,username', 'regex:/^@[a-zA-Z0-9_]+$/', 'starts_with:@'],
            'email' => ['required', 'email', 'string', 'max:255', 'unique:users,email'],
            'password' => ['required', 'confirmed', 'min:3'],
        ]);

        $user = User::create($validatedFields);

        $token = $user->createToken($request->name);

        return [
            'user' => $user,
            'token' => $token->plainTextToken
        ];
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => ['required', 'email', 'string', 'max:255', 'exists:users'],
            'password' => ['required'],
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return [
                'errors' => [
                    'email' => [
                        'The provided credentials are incorrect.'
                    ]
                ]
            ];
        }

        $token = $user->createToken($user->name);

        return [
            'user' => $user,
            'token' => $token->plainTextToken
        ];
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return [
            'message' => 'You are logged out.'
        ];
    }
}
