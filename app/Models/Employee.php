<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;

    protected $primaryKey = 'id';

    protected $fillable = [
    	  'id',
        'name',
        'job_title',
    ];

    public $timestamps = false;

    public function user()
    {
      return $this->belongsTo(User::class);
    }
}
