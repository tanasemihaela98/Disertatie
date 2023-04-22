<?php

try {
    $user = Auth::user();

    $validator = Validator::make($request->all(), [
        'name' => 'nullable',
        'email' => ['nullable', 'email', Rule::unique('users', 'email')->ignore($user->id)],
        'password' => 'nullable'
    ]);

    if ($validator->fails()) {
        return $this->sendError('Bad request!', $validator->messages()->toArray());
    }

    $user->name = $request->get('name', $user->name);

    if ($request->has('email') && $request->get('email') !== $user->email) {
        $user->email = $request->get('email');
        $user->email_verified_at = null;
        $user->verify_token = Str::random(10);

        $user->notify(new VerifyEmail($user->verify_token));
    }

    if ($request->has('password')) {
        $user->password = Hash::make($request->get('password'));
    }

    $user->save();

    return $this->sendResponse($user->toArray());
} catch (Exception $exception) {
    Log::error($exception);

    return $this->sendError('Something went wrong, please contact administrator!', [], Response::HTTP_INTERNAL_SERVER_ERROR);
}
