<?php

namespace App\Http\Resources;
use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;
class AssetResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'item_id' => $this->item_id,
            'item_name' => $this->item_name,
            'brand_id' => $this->brand_id,
            'brand_name' => $this->brand_name,            
            'type' => $this->type,
            'serial_number' => $this->serial_number,
            'purchase_date' => Carbon::parse($this->purchase_date)->format('Y-m-d'),
            'owner' => $this->owner,
            //'delegation_to' => $this->delegation_to,
            'tag' => $this->tag,
            'status' => $this->status,
        ];
    }
}
