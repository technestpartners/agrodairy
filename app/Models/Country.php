<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Country extends Model
{
    protected $fillable = [
        'export_market_id',
        'name',
        'slug',
        'code',
        'flag_emoji',
        'primary_ports',
        'import_regulations_summary',
        'required_documents_summary',
        'popular_products_summary',
        'is_active',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    public function exportMarket(): BelongsTo
    {
        return $this->belongsTo(ExportMarket::class);
    }

    public function ports(): HasMany
    {
        return $this->hasMany(Port::class);
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }
}
