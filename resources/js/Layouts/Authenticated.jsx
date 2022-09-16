import { Head, usePage } from '@inertiajs/inertia-react'
import React, {useEffect} from 'react';
import toast, { Toaster } from 'react-hot-toast'
import Navbar from '../Components/Dashboard/Navbar'
import Sidebar from '../Components/Dashboard/Sidebar'
import Footer from '../Components/Dashboard/Footer'

export default function Authenticated({children, title}) {
  
   const { flash } = usePage().props
  
   useEffect(() => {
        flash.type && toast[flash.type](flash.message)
    },[flash])
   
   
    return (        
        <div className="g-sidenav-show bg-gray-100">
            <div className="min-height-300 bg-primary position-absolute w-100"></div>
                <Head title={ title } />
                <Sidebar />
                <main className="main-content position-relative border-radius-lg d-flex flex-column min-vh-100 ">
                    <Navbar pageName={ title } />
                    <Toaster position='top-center' duration='4000'/>
                    {children}
                    <Footer/>
                </main>            
        </div>          
    )
}
