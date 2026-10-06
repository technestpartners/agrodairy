<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Certification extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'certificate_no',
        'issuing_body',
        'issue_date',
        'expiry_date',
        'file_path',
        'image_path',
        'verification_url',
        'status',
        'description',
        'is_active',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'issue_date' => 'date',
            'expiry_date' => 'date',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    public function scopeExpiringSoon(Builder $query, int $days = 60): Builder
    {
        return $query->whereNotNull('expiry_date')
            ->whereBetween('expiry_date', [now(), now()->addDays($days)]);
    }

    public function getIsExpiredAttribute(): bool
    {
        return $this->expiry_date && $this->expiry_date->isPast();
    }

    public function getNameAttribute(): string
    {
        return $this->attributes['title'] ?? '';
    }

    public function getCertificateNumberAttribute(): ?string
    {
        return $this->attributes['certificate_no'] ?? null;
    }

    public function getDaysUntilExpiryAttribute(): ?int
    {
        if (!$this->expiry_date) {
            return null;
        }
        return (int) now()->diffInDays($this->expiry_date, false);
    }
}
