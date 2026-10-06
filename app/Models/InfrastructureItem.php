<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InfrastructureItem extends Model
{
    protected $fillable = [
        'title',
        'category',
        'description',
        'capacity',
        'location',
        'image',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'sort_order' => 'integer',
        ];
    }
}
