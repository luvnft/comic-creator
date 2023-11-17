import React from 'react'
import { FaLinkedin, FaGithub } from 'react-icons/fa6';
import { GrInstagram } from 'react-icons/gr';

const Footer = () => {
    return (
        <div className='bg-white px-16 py-4 flex justify-between items-center'>
            <span className='text-stone-600 font-medium text-base'>Made by Dibyendu</span>
            <div className='flex gap-3 justify-center cursor-pointer'>
                <a href={'https://www.linkedin.com/in/dibyendu303/'} target="_blank" rel="noreferrer">
                    <div className='flex justify-center items-center w-10 h-10 text-2xl rounded-full border border-gray-400'>
                        <FaLinkedin style={{ color: "#3b82f6" }} />
                    </div>
                </a>
                <a href='https://github.com/dibyendu303/' target="_blank" rel="noreferrer">
                    <div className='flex justify-center items-center w-10 h-10 text-2xl rounded-full border border-gray-400'>
                        <FaGithub style={{ color: "#000000" }} />
                    </div>
                </a>
                <a href='https://www.instagram.com/dib303/' target="_blank" rel="noreferrer">
                    <div className='flex justify-center items-center w-10 h-10 text-2xl rounded-full border border-gray-400'>
                        <GrInstagram style={{ color: "#ef4444" }} />
                    </div>
                </a>
            </div>
        </div>
    )
}

export default Footer