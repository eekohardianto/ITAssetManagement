import React, { useCallback, useEffect, useState } from 'react'
import Dialog from '../../Components/Dashboard/DialogLarge';
import Authenticated from '../../Layouts/Authenticated'
import useDialog from '../../Hooks/useDialog';
import CreateAsset from '../../Components/Dashboard/Assets/CreateAsset';
import EditAsset from '../../Components/Dashboard/Assets/EditAsset';
import { Inertia } from '@inertiajs/inertia';
import { debounce, pickBy } from 'lodash';

export default function Index(props) {

    const {data: assets, meta, filtered, attributes, items, brands} = props.assets; 
   // const {data: item} = props.items;
    //const {data: brands} = props.brands;

    const [state, setState] = useState([])
    const [addDialogHandler, addCloseTrigger,addTrigger] = useDialog()
    const [UpdateDialogHandler, UpdateCloseTrigger,UpdateTrigger] = useDialog()
    const [destroyDialogHandler, destroyCloseTrigger,destroyTrigger] = useDialog()
    const [params, setParams] = useState(filtered)
    const [pageNumber, setPageNumber] = useState([])
    
    useEffect(() => reload(params), [params]);
    useEffect(() => {
        let numbers = [];
        for (let i = attributes.per_page; i <= attributes.total / attributes.per_page; i = i + attributes.per_page) {
            numbers.push(i)
        }
        setPageNumber(numbers);
    }, []);

    const reload = useCallback(
        debounce((query) => {
            Inertia.get(
                route('assets.index'),
                {...pickBy(query), page: query.q ? 1 : query.page},
                //pickBy(query),
                {
                    preserveState: true,
                    preserveScroll: true,
                }
            )
        }, 150)
        ,
        []
        )
     
    const openUpdateDialog = (asset) => {
        setState(asset);
        UpdateDialogHandler()
    }

    const openDestroyDialog = (asset) => {
        setState(asset);
        destroyDialogHandler()        
    };

    const destroyAsset = () => {
        Inertia.delete(
            route('assets.destroy', state.id), 
            { onSuccess: () => destroyCloseTrigger() });
    }

    const onChange = (event) => setParams({...params, [event.target.name]: event.target.value})
    const sort = (item) => {
        setParams({
            ...params,
            field: item,
            direction: params.direction == 'asc' ? 'desc' : 'asc'
        })
    }

    return (
        <>
            <div className="container-fluid py-4">
                <Dialog trigger={addTrigger} title="Add New Asset"> 
                    <CreateAsset model={[items, brands]} close={addCloseTrigger}/>
                </Dialog>

                <Dialog trigger={UpdateTrigger} title={`Update Asset: ${state.serial_number}`}> 
                    <EditAsset model={[state, items, brands]} close={UpdateCloseTrigger}/>
                </Dialog>

                <Dialog trigger={destroyTrigger} title={`Delete Asset: ${state.serial_number}`}>
                    <p>Are you sure to delete this asset ?</p>
                    <div className="modal-footer">
                        <button type="button" className="btn bg-gradient-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" onClick={destroyAsset} className="btn bg-gradient-danger">Delete</button>
                    </div>
                </Dialog>

                <div className="row pb-4">
                    <div className="col-12 w-100">
                        <div className="card h-100 w-100">                            
                            <div className="card-header pb-0">
                            <div className="row">
                                    <div className="col-md-6">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <input type="text" className="form-control" name="q" id="q" placeholder="search" onChange={onChange} value={params.q} />
                                                </div>
                                            </div>
                                            <div className="col-md-2">
                                                <div className="form-group">
                                                    <select className="form-select" name="load" id="load" onChange={onChange} value={params.load}>
                                                        {pageNumber.map((page, index) => <option key={index}>{page}</option>)}
                                                        
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                <div className="col-md-6 d-flex justify-content-end">
                                

                                    <button onClick={addDialogHandler} type="button" className="btn bg-gradient-primary btn-block mb-3" data-bs-toggle="modal" data-bs-target="#exampleModalMessage">
                                        Add New Asset
                                    </button>
                                </div>
                            </div>
                            </div>
                            <div className="card-body px-0 pt-0 pb-2">
                            <div className="table-responsive-xxl p-0" width="100%">
                                <table className="table align-items-center justify-content-center mb-0" width="100%">
                                    <thead>
                                        <tr>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-centter">#</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-left">
                                                    <div className="cursor-pointer" onClick={() => sort('item_id')}>
                                                        Item
                                                        { params.direction == 'asc' 
                                                        ? <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg> 
                                                        : <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg> }
                                                        </div>
                                                </th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-left">
                                                    <div className="cursor-pointer" onClick={() => sort('brand_id')}>
                                                        Brand
                                                        { params.direction == 'asc' 
                                                        ? <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg> 
                                                        : <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg> }
                                                        </div>
                                                </th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-left opacity-7 ps-2">Type</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-left opacity-7 ps-2">SN</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-left opacity-7 ps-2">                                                
                                                <div className="cursor-pointer" onClick={() => sort('purchase_date')}>
                                                        Purchase Date
                                                        { params.direction == 'asc' 
                                                        ? <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg> 
                                                        : <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg> }
                                                        </div>
                                                </th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {assets.map((asset, index) => (
                                            <tr key={asset.id}>
                                                <td className='text-center'>{meta.from + index}</td>
                                               
                                                <td className='text-left'>
                                                    <h6 className="mb-0 text-sm">{asset.item_name}</h6>
                                                </td>
                                                <td className='text-left'>
                                                    <p className="text-sm font-weight-bold mb-0">{asset.brand_name}</p>
                                                </td>
                                                <td className='text-left'>
                                                    <span className="text-xs font-weight-bold">{asset.type}</span>
                                                </td>
                                                <td className="align-middle text-left">
                                                    <div className="d-flex align-items-center text-left">
                                                        <span className="text-xs font-weight-bold mb-0">{asset.serial_number}</span>
                                                    </div>
                                                </td>
                                                <td className="align-middle text-left">
                                                    <div className="d-flex align-items-center text-left">
                                                        <span className="text-xs font-weight-bold mb-0">{asset.purchase_date}</span>
                                                    </div>
                                                </td>
                                                <td className="align-middle text-center" width="10%">
                                                <div>
                                                    <button type="button" onClick={() => openUpdateDialog(asset)} className="btn btn-vimeo btn-icon-only mx-2">
                                                        <span className="btn-inner--icon"><i className="fas fa-pencil-alt"></i></span>
                                                    </button>
                                                    <button type="button" onClick={() => openDestroyDialog(asset)} className="btn btn-youtube btn-icon-only">
                                                        <span className="btn-inner--icon"><i className="fas fa-trash"></i></span>
                                                    </button>
                                                </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        { meta.links.map((item, index) => (
                           /*  <li key={k} className="page-item">
                                <Link disabled={link.url == null ? true : false} as="button" className={`${link.active && 'bg-info'} ${link.url == null && 'btn bg-gradient-secondary text-white'} page-link`} href={link.url || ''} dangerouslySetInnerHTML={{ __html: link.label }}/>
                            </li> */
                            <li key={index} className="page-item">
                                <button disabled={item.url == null ? true : false} as="button" className={`${item.active && 'bg-info'} ${item.url == null && 'btn bg-gradient-secondary text-white'} page-link`} href={item.url || ''} onClick={() => setParams({...params, page: new URL(item.url).searchParams.get('page')})} dangerouslySetInnerHTML={{ __html: item.label }}></button>
                            </li>
                          
                            
                        )
                        )}                      

                    </ul>
                </nav>
            </div>
        </>
    )
}

Index.layout = (page) => <Authenticated key={page} children={page} title={"Manage Assets"}/>
