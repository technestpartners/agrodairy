<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'phone',
        'department',
        'is_active',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_active' => 'boolean',
        ];
    }

    public function isSuperAdmin(): bool
    {
        return $this->role === 'super_admin';
    }

    public function isAdmin(): bool
    {
        return in_array($this->role, ['super_admin', 'admin']);
    }

    public function isSales(): bool
    {
        return in_array($this->role, ['super_admin', 'admin', 'sales_manager', 'sales_executive']);
    }

    public function isQuality(): bool
    {
        return in_array($this->role, ['super_admin', 'admin', 'quality_manager']);
    }

    public function isContentEditor(): bool
    {
        return in_array($this->role, ['super_admin', 'admin', 'content_editor']);
    }

    public function canManageProducts(): bool
    {
        return in_array($this->role, ['super_admin', 'admin', 'content_editor']);
    }

    public function canManageInquiries(): bool
    {
        return in_array($this->role, ['super_admin', 'admin', 'sales_manager', 'sales_executive']);
    }

    public function canManageSettings(): bool
    {
        return in_array($this->role, ['super_admin', 'admin']);
    }

    public function assignedInquiries(): HasMany
    {
        return $this->hasMany(Inquiry::class, 'assigned_to');
    }

    public function quotations(): HasMany
    {
        return $this->hasMany(Quotation::class, 'created_by');
    }

    public function auditLogs(): HasMany
    {
        return $this->hasMany(AuditLog::class);
    }
}
