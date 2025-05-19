<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function update(Request $request)
    {
        $user = Auth::user();

        $validatedFields = $request->validate([
            'name' => ['required', 'regex:/^[A-Za-z\s.-]+$/'],
            'location' => ['nullable', 'string'],
            'bio' => ['nullable', 'string'],
            'profile_picture' => ['image','mimes:png,jpg,jpeg'],
        ]);

        if ($request->hasFile('profile_picture')) {
            $image = $request->file('profile_picture');
            $image_name = uniqid('pp_') . '.' . $image->getClientOriginalExtension();
            // Save to storage/app/public/images/profiles
            $image->storeAs('public/images/profiles', $image_name);
            // Also save to public/images/profiles
            $public_path = public_path('images/profiles');
            if (!file_exists($public_path)) {
                mkdir($public_path, 0755, true);
            }
            $image->move($public_path, $image_name);
            // Save the relative path for frontend access
            $validatedFields['profile_picture'] = 'images/profiles/' . $image_name;
        }

        /** @var User $user */
        $user->update($validatedFields);

        return ['message' => $user];
    }
}
