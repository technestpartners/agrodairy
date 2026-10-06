<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class PackagingType extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'material',
        'capacity_options',
        'description',
        'image',
        'is_bulk',
        'is_vacuum',
        'is_private_label',
        'is_active',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'is_bulk' => 'boolean',
            'is_vacuum' => 'boolean',
            'is_private_label' => 'boolean',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }
}
