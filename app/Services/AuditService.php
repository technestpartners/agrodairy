<?php

namespace App\Services;

use App\Models\AuditLog;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;

class AuditService
{
    public static function log(
        string $action,
        ?string $modelType = null,
        ?int $modelId = null,
        ?string $details = null
    ): void {
        try {
            AuditLog::create([
                'user_id' => Auth::id(),
                'action' => $action,
                'model_type' => $modelType,
                'model_id' => $modelId,
                'details' => $details,
                'ip_address' => Request::ip(),
                'user_agent' => Request::userAgent(),
            ]);
        } catch (\Throwable $e) {
            // Silently log or ignore to not break user action
            \Illuminate\Support\Facades\Log::warning('AuditLog write failed: ' . $e->getMessage());
        }
    }
}
