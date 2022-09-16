<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Http\Requests\EmployeeRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function index()
    {
        $users = UserResource::collection(User::latest()->paginate(10));
        return inertia('Users/Index', [
            'users' => $users,
        ]);
    }

    public function store(UserRequest $request)
    {
        $attr = $request->toArray();

        User::create($attr);

        return back()->with([
            'type' => 'success',
            'message' => 'User has been created',
        ]);
    }

    public function update(UserRequest $request, User $user)
    {
        $attr = $request->toArray();
             
        $user->update($attr);

        Employee::where('id', Auth::user()->id)->update(['name' => $attr['name']]);

        return back()->with([
           'type' => 'success',
           'message' => 'User has been updated',
        ]);
    }

    public function destroy(User $user)
    {
        $user->delete();

        return back()->with([
            'type' => 'success',
            'message' => 'User has been deleted',
        ]);
    }
}
