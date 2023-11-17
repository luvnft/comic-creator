import React from 'react'

const Navbar = () => {
    return (
        <div className='p-5 shadow-md bg-white text-lg font-semibold flex gap-3 items-center'>
            <img src='/logo512.png' className='w-8'></img>
            <span>
                Comic creator
            </span>
        </div>
    )
}

export default Navbar