<?php

namespace App\Http\Resources;

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
            'brand_id' => $this->brand_id,
            'type' => $this->type,
            'serial_number' => $this->serial_number,
            'purchase_date' => $this->purchase_date,
            'owner' => $this->owner,
            'tag' => $this->tag,
            'status' => $this->status,
        ];
    }
}
