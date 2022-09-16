<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Asset extends Model
{
    use HasFactory;

    protected $primaryKey = 'id';

    protected $fillable = [
        'id',
        'item_id',
        'brand_id',
        'type',
        'serial_number',
        'purchase_date',
        'owner',
        'tag',
        'status',
        'remarks',
        'created_by',
    ];
}
