import React from 'react';

export default function Button({ type = 'submit', className = '', processing, children }) {
    return (
        <button
            type={type}
            className={
                `btn btn-lg btn-primary btn-lg w-100 mt-4 mb-0 transition ease-in-out duration-150 ${
                    processing && 'opacity-25'
                } ` + className
            }
            disabled={processing}
        >
            {children}
        </button>
    );
}
