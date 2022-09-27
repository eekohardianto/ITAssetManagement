import { useForm } from '@inertiajs/inertia-react'
import React, { useEffect } from 'react'

export default function EditAsset({close, model}) {
    
    const datacol = model[0]
    const itemlist = model[1]
    const brandlist = model[2] 
    
    const { data, setData, put, reset, errors } = useForm({ item_id: datacol.item_id, brand_id: datacol.brand_id, type: datacol.type, serial_number: datacol.serial_number, purchase_date: datacol.purchase_date, delegation_to: datacol.delegation_to, owner: datacol.owner, tag: datacol.tag, status: datacol.status, remarks: datacol.remarks});
    
    const onChange = (e) => setData({ ...data, [e.target.id]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        put(route('assets.update', datacol.id), {
            data, 
            onSuccess: () => {
                reset(),
                close()
            }, 
        });
    }

    useEffect(() => {
        setData({...data,
            item_name: datacol.item_name, item_id: datacol.item_id, brand_name: datacol.brand_name, brand_id: datacol.brand_id, type: datacol.type, serial_number: datacol.serial_number, purchase_date: datacol.purchase_date, delegation_to: datacol.delegation_to, owner: datacol.owner, tag: datacol.tag, status: datacol.status, remarks: datacol.remarks 
        });
    }, [datacol]);

    const onCloseModal = (e) => {
        e.preventDefault();
        reset()       
        close()
    }
  

    return (
        <>
            <form onSubmit={onSubmit}>
                <div className="modal-body">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="item_id" className="col-form-label">Item:</label>
                                <select className="form-select" name="item_id" id="item_id" onChange={onChange} defaultValue={data.item_id} value={data.item_id}>
                                     <option value={data.item_id}>{data.item_name}</option>
                                    {itemlist.map((i, index) => <option key={index} value={i.item_id}>{i.item_name}</option>)}                                    
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="type-item" className="col-form-label">Type:</label>
                                <input type="text" className="form-control" name='type' value={`${data.type || ''}`} onChange={onChange} id="type" />
                                {errors && <div className='text-danger mt-1'>{errors.type}</div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="purchase-date" className="col-form-label">Purchase Date:</label>
                                <input className="form-control" type="date" value={`${data.purchase_date || ''}`} onChange={onChange} id="purchase_date" name="purchase_date" />
                                {errors && <div className='text-danger mt-1'>{errors.purchase_date}</div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="delegateto" className="col-form-label">Delegate To:</label>
                                <input type="text" className="form-control" name='delegation_to' value={`${data.delegation_to || ''}`} onChange={onChange} id="delegation_to" />
                                {errors && <div className='text-danger mt-1'>{errors.delegate}</div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="status" className="col-form-label">Status:</label>
                                <input type="text" className="form-control" name='status' value={`${data.status || ''}`} onChange={onChange} id="status" />
                                {errors && <div className='text-danger mt-1'>{errors.status}</div>}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="brand_id" className="col-form-label">Brand:</label>
                                <select className="form-select" name="brand_id" id="brand_id" onChange={onChange} defaultValue={data.brand_id} value={data.brand_id}>
                                    <option value={data.brand_id}>{data.brand_name}</option>
                                    {brandlist.map((i, index) => <option key={index} value={i.brand_id}>{i.brand_name}</option>)}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="serial_number" className="col-form-label">SN:</label>
                                <input type="text" className="form-control" name='serial_number' value={`${data.serial_number || ''}`} onChange={onChange} id="serial_number" />
                                {errors && <div className='text-danger mt-1'>{errors.serial_number}</div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="owner" className="col-form-label">Owner:</label>
                                <input type="text" className="form-control" name='owner' value={`${data.owner || ''}`} onChange={onChange} id="owner" />
                                {errors && <div className='text-danger mt-1'>{errors.owner}</div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="tag" className="col-form-label">Tag:</label>
                                <input type="text" className="form-control" name='tag' value={`${data.tag || ''}`} onChange={onChange} id="tag" />
                                {errors && <div className='text-danger mt-1'>{errors.tag}</div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="remarks" className="col-form-label">Remarks:</label>
                                <input type="text" className="form-control" name='remarks' value={`${data.remarks || ''}`} onChange={onChange} id="remarks" />
                                {errors && <div className='text-danger mt-1'>{errors.remarks}</div>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn bg-gradient-secondary" onClick={onCloseModal}>Close</button>
                    <button type="submit" className="btn bg-gradient-primary">Update</button>
                </div>
            </form>
        </>

    )
}
