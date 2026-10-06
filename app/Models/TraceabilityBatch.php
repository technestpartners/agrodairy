<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TraceabilityBatch extends Model
{
    protected $fillable = [
        'batch_code',
        'product_id',
        'origin_region',
        'harvest_date',
        'processing_date',
        'packing_date',
        'inspection_status',
        'certificate_of_analysis_no',
        'coa_file_path',
        'packing_type',
        'purity_percentage',
        'moisture_percentage',
        'container_number',
        'port_of_loading',
        'shipment_status',
        'public_notes',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'harvest_date' => 'date',
            'processing_date' => 'date',
            'packing_date' => 'date',
            'is_active' => 'boolean',
        ];
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    public function getCoaNumberAttribute(): ?string
    {
        return $this->certificate_of_analysis_no;
    }

    public function getMoistureTestedAttribute(): ?string
    {
        return $this->moisture_percentage;
    }

    public function getPurityTestedAttribute(): ?string
    {
        return $this->purity_percentage;
    }

    public function getPackagingTypeAttribute(): ?string
    {
        return $this->packing_type;
    }
}
