<?php

namespace App\Http\Controllers;

use App\Http\Requests\AssetRequest;
use App\Http\Resources\AssetResource;
use App\Http\Resources\ItemResource;
use App\Http\Resources\BrandResource;
use App\Models\Asset;
use App\Models\Item;
use App\Models\Brand;
use Illuminate\Http\Request;

class AssetController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public $loadDefault = 10;

    public function index(Request $request)
    {             
       $query = Asset::query();
       $query->Join('items', 'item_id', '=', 'items.itemID')
                ->Join('brands', 'brand_id', '=', 'brands.brandID');
       if($request->q){
            $query->where('item_name', 'like',  '%'. $request->q .'%')
                    ->orWhere('brand_name', 'like',  '%'. $request->q .'%')
                    ->orWhere('serial_number', 'like',  '%'. $request->q .'%');
       }

       if($request->has(['field', 'direction'])) {
            $query->orderBy($request->field, $request->direction);
       }

       $assets = (
            AssetResource::collection($query->paginate($request->load))
    
        )
        ->additional([
            'attributes' => [
                'total' => Asset::count(),
                'per_page' => 10,   
            ],
            'filtered' => [
                'load' => $request->load ?? $this->loadDefault,
                'q' => $request->q ?? '',
                'page' => $request->page ?? 1,
                'field' => $request->field ?? '',
                'direction' => $request->direction ?? '',
            ],
            'items' => ItemResource::collection(Item::all()),
            'brands' => BrandResource::collection(Brand::all())
        ]);

       // $items = ItemResource::collection(Item::all());
        //$brands = BrandResource::collection(Brand::all());
       
        return inertia('Assets/Index', [
           'assets' => $assets,           
       ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreAssetRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(AssetRequest $request)
    {
        $attr = $request->toArray();

        Asset::create($attr);

        return back()->with([
            'type' => 'success',
            'message' => 'Asset has been added',
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Asset  $asset
     * @return \Illuminate\Http\Response
     */
    public function show(Asset $asset)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Asset  $asset
     * @return \Illuminate\Http\Response
     */
    public function edit(Asset $asset)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateAssetRequest  $request
     * @param  \App\Models\Asset  $asset
     * @return \Illuminate\Http\Response
     */
    public function update(AssetRequest $request, Asset $asset)
    {
        $attr = $request->toArray();
             
        $asset->update($attr);        

        return back()->with([
           'type' => 'success',
           'message' => 'Asset has been updated',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Asset  $asset
     * @return \Illuminate\Http\Response
     */
    public function destroy(Asset $asset)
    {
        $asset->delete();

        return back()->with([
            'type' => 'success',
            'message' => 'Asset has been deleted',
        ]);
    }
}
