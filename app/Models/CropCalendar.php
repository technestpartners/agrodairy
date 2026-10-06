<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CropCalendar extends Model
{
    protected $fillable = [
        'crop_name',
        'category',
        'sowing_start',
        'sowing_end',
        'harvest_start',
        'harvest_end',
        'peak_export_start',
        'peak_export_end',
        'major_states',
        'notes',
    ];
}
