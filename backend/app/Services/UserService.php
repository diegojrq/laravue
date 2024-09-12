<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use App\Repositories\UserRepository;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class UserService
{
    private UserRepository $UserRepository;

    public function __construct(
        UserRepository $UserRepository,
    ) {
        $this->UserRepository = $UserRepository;
    }

    public function register($request): JsonResponse
    {
        try {
            $data = $request->validate(
                User::rules(),
                User::messages()
            );
    
            $data['password'] = bcrypt($request->password);
    
            $user = User::create($data);
    
            $token = $user->createToken('API Token')->accessToken;
    
            return response()->json(
                [
                    'success' => [
                        'message' => __(
                            'messages.saved',
                            [
                                'model' => User::class
                            ]
                        )
                    ],
                    'data' => [
                        'user' => $user,
                        'token' => $token
                    ]
                ],
                Response::HTTP_CREATED
            );
        } catch (\ValidationException $e) {
            return response()->json(
                [
                    'error' => [$e->getMessage()]
                ],
                Response::HTTP_BAD_REQUEST
            );
        }
    }

    public function login($request): JsonResponse
    {
        $data = $request->validate(
            [
                'email' => 'required|email',
                'password' => 'required'
            ]
        );

        if (!auth()->check($data)) {
            return response()->json(
                [
                    'error' => [
                        'title' => __('auth.failed'),
                        'message' => __('auth.failed')
                    ]
                ],
                Response::HTTP_UNAUTHORIZED
            );
        }

        $token = auth()->user()->createToken('API Token')->accessToken;

        return response()->json(
            [
                'success' => [
                    'message' => __('auth.success')
                ],
                'data' => [
                    'token' => $token,
                    'user' => auth()->user()
                ]
            ],
            Response::HTTP_OK
        );       
    }

    public function all($request): JsonResponse
    {
        $users = $this->UserRepository->all($request->all());
        //return response()->json($users, Response::HTTP_OK);

        return response()->json(
            [
                'users' =>  $users
            ],
            Response::HTTP_OK
        );
    }
}
