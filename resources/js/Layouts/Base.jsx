import { Head, usePage } from '@inertiajs/inertia-react';
import React, {useEffect} from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function Authenticated({children, title}) {
    const { flash } = usePage().props
  
   useEffect(() => {
        flash.type && toast[flash.type](flash.message)
    },[flash])
    
    return (
        <main className="main-content  mt-0">
            <Head title={ title } />

            <section>            
                <Toaster position='top-center' duration='4000'/>
                {children}                   
            </section>
        </main>
    )
}
