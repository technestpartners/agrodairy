<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Inquiry extends Model
{
    protected $fillable = [
        'inquiry_number',
        'name',
        'company',
        'email',
        'phone',
        'whatsapp',
        'country',
        'product_id',
        'product_variant',
        'quantity',
        'unit',
        'packaging_preference',
        'destination_port',
        'incoterm',
        'target_price',
        'target_currency',
        'preferred_delivery_date',
        'message',
        'attachment_path',
        'status',
        'assigned_to',
        'ip_address',
    ];

    protected function casts(): array
    {
        return [
            'quantity' => 'decimal:2',
            'target_price' => 'decimal:2',
            'preferred_delivery_date' => 'date',
        ];
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function assignedUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    public function notes(): HasMany
    {
        return $this->hasMany(InquiryNote::class)->latest();
    }

    public function statusHistories(): HasMany
    {
        return $this->hasMany(InquiryStatusHistory::class)->latest();
    }

    public function quotations(): HasMany
    {
        return $this->hasMany(Quotation::class)->latest();
    }

    public function quotation(): HasOne
    {
        return $this->hasOne(Quotation::class)->latestOfMany();
    }

    public function scopeStatus(Builder $query, string $status): Builder
    {
        return $query->where('status', $status);
    }

    public function scopeNewInquiries(Builder $query): Builder
    {
        return $query->where('status', 'new');
    }

    public function getStatusBadgeAttribute(): string
    {
        return match ($this->status) {
            'new' => 'bg-emerald-100 text-emerald-800 border-emerald-300',
            'reviewed' => 'bg-blue-100 text-blue-800 border-blue-300',
            'assigned' => 'bg-indigo-100 text-indigo-800 border-indigo-300',
            'quotation_prepared' => 'bg-amber-100 text-amber-800 border-amber-300',
            'quotation_sent' => 'bg-purple-100 text-purple-800 border-purple-300',
            'negotiation' => 'bg-orange-100 text-orange-800 border-orange-300',
            'accepted' => 'bg-green-100 text-green-900 border-green-400',
            'rejected' => 'bg-rose-100 text-rose-800 border-rose-300',
            'completed' => 'bg-teal-100 text-teal-900 border-teal-300',
            default => 'bg-slate-100 text-slate-800 border-slate-300',
        };
    }
}
