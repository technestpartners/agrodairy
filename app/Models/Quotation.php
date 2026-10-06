<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Quotation extends Model
{
    protected $fillable = [
        'quotation_number',
        'inquiry_id',
        'created_by',
        'currency',
        'incoterm',
        'origin_port',
        'destination_port',
        'payment_terms',
        'valid_until',
        'subtotal',
        'freight',
        'insurance',
        'other_charges',
        'grand_total',
        'status',
        'revision_number',
        'terms_and_conditions',
        'notes',
        'pdf_path',
    ];

    protected function casts(): array
    {
        return [
            'valid_until' => 'date',
            'subtotal' => 'decimal:2',
            'freight' => 'decimal:2',
            'insurance' => 'decimal:2',
            'other_charges' => 'decimal:2',
            'grand_total' => 'decimal:2',
            'revision_number' => 'integer',
        ];
    }

    public function inquiry(): BelongsTo
    {
        return $this->belongsTo(Inquiry::class);
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function items(): HasMany
    {
        return $this->hasMany(QuotationItem::class);
    }

    public function scopeStatus(Builder $query, string $status): Builder
    {
        return $query->where('status', $status);
    }

    public function getStatusBadgeAttribute(): string
    {
        return match ($this->status) {
            'draft' => 'bg-slate-100 text-slate-800 border-slate-300',
            'sent' => 'bg-blue-100 text-blue-800 border-blue-300',
            'revised' => 'bg-amber-100 text-amber-800 border-amber-300',
            'accepted' => 'bg-emerald-100 text-emerald-800 border-emerald-300',
            'rejected' => 'bg-rose-100 text-rose-800 border-rose-300',
            'expired' => 'bg-gray-100 text-gray-800 border-gray-300',
            default => 'bg-slate-100 text-slate-800 border-slate-300',
        };
    }
}
