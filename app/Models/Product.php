<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    protected $fillable = [
        'category_id',
        'name',
        'slug',
        'sku',
        'short_description',
        'description',
        'origin',
        'grade_variety',
        'hs_code',
        'moq',
        'moq_unit',
        'available_quantity',
        'shelf_life',
        'storage_conditions',
        'packaging_summary',
        'loading_summary',
        'spec_sheet_pdf',
        'main_image',
        'is_featured',
        'is_active',
        'sort_order',
        'meta_title',
        'meta_description',
        'meta_keywords',
    ];

    protected function casts(): array
    {
        return [
            'moq' => 'decimal:2',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(ProductCategory::class, 'category_id');
    }

    public function images(): HasMany
    {
        return $this->hasMany(ProductImage::class)->orderBy('sort_order');
    }

    public function specifications(): HasMany
    {
        return $this->hasMany(ProductSpecification::class)->orderBy('sort_order');
    }

    public function traceabilityBatches(): HasMany
    {
        return $this->hasMany(TraceabilityBatch::class);
    }

    public function inquiries(): HasMany
    {
        return $this->hasMany(Inquiry::class);
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    public function scopeFeatured(Builder $query): Builder
    {
        return $query->where('is_featured', true);
    }

    public function getFormattedMoqAttribute(): string
    {
        return rtrim(rtrim((string) $this->moq, '0'), '.') . ' ' . $this->moq_unit;
    }

    public function getGroupedSpecificationsAttribute(): array
    {
        return $this->specifications->groupBy('spec_group')->toArray();
    }
}
