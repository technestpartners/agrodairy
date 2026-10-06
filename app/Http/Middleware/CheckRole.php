<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     * @param  string  ...$roles
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        if (!auth()->check()) {
            return redirect()->route('admin.login')->with('error', 'Please log in to access this area.');
        }

        $user = auth()->user();

        if (!$user->is_active) {
            auth()->logout();
            return redirect()->route('admin.login')->with('error', 'Your account has been deactivated.');
        }

        // Super Admin bypasses role restrictions
        if ($user->isSuperAdmin()) {
            return $next($request);
        }

        if (!empty($roles) && !in_array($user->role, $roles)) {
            abort(403, 'Unauthorized access. Your role does not have permission for this module.');
        }

        return $next($request);
    }
}
