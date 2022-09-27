<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    use HasFactory;

    protected $table = "brands";

    protected $primaryKey = 'brandID';
    public $incrementing = false;

    protected $fillable = ['brandID', 'brand_name'];
 
    public function asset()
    {
    	return $this->hasOne(Asset::class, 'brand_id', 'brandID');
    }
}
