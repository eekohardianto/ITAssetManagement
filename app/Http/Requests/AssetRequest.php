<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AssetRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'item_id' => ['required'],
            'brand_id' => ['required'],
            'type' => ['required'],            
            'serial_number' => ['required'],
            'purchase_date' => ['required'],
            'owner' => ['required'],
            'status' => ['required'],
        ];
    }
}
