import { Link, usePage } from '@inertiajs/inertia-react'
import React from 'react'

export default function Navbar() {
    const { auth } = usePage().props;
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
            <div className="container">                
                <i className="fas fa-solid fa-angle-right fa-2x text-white"></i>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link" href={route('home')}>Home</Link>
                    </li>                    
                    <li className="nav-item">
                        <Link className="nav-link" href={route('dashboard')}>Dashboard</Link>
                    </li>
                </ul>
                    {auth.user == null ?
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" href={route('login')}>Login</Link>
                            </li>
                        </ul>
                        : null}
                </div>
            </div>
        </nav>
    )
}
