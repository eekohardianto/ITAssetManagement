<?php
 
 namespace App\Models;
 
use Illuminate\Database\Eloquent\Model;
 
class Item extends Model
{
    protected $table = "items";

    protected $primaryKey = 'itemID';
    public $incrementing = false;

    protected $fillable = ['itemID', 'item_name'];
 
    public function asset()
    {
    	return $this->hasOne(Asset::class, 'item_id', 'itemID');
    }
}