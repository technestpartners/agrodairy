<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HsCode extends Model
{
    protected $fillable = [
        'hs_code',
        'product_name',
        'category',
        'gst_export_incentive',
        'standard_description',
        'notes',
    ];
}
