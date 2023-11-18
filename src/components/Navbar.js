import React from 'react'
import SnapShot from './SnapShot'

const Navbar = () => {
    return (
        <div className='py-5 px-5 sm:px-10 shadow-md bg-white flex justify-between'>
            <div className='text-lg font-semibold flex gap-3 items-center'>
                <img src='/logo512.png' alt='Comic creator logo' className='w-8'></img>
                <span>
                    Comic creator
                </span>
            </div>
            <SnapShot />
        </div>
    )
}

export default Navbar