import React, { useState } from 'react'
import { LuImageOff } from "react-icons/lu";

const ComicSlide = (props) => {
    const { data, index, large } = props;
    const [text, setText] = useState("");
    const [open, setOpen] = useState(false);

    return (
        <div className={`relative shadow-lg overflow-hidden border-2 flex-1 border-black h-[300px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white to-gray-300 m-1 ${large ? "basis-[500px]" : "basis-[300px]"} flex justify-center items-center`}>
            {/* <div className={`relative shadow-lg overflow-hidden border-2 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] ${index % 4 === 0 ? "from-yellow-300 to-amber-500" : index % 4 === 1 ? "from-cyan-200 to-cyan-500" : index % 4 === 2 ? "from-lime-300 to-lime-500" : "from-red-300 to-red-500"} flex-1 border-black h-[200px] bg-white m-1 ${index === 0 || index === 7 ? "basis-96" : "basis-48"}`}> */}
            {text ?
                index === 0 || index === 3 || index === 5 || index === 9
                    ?
                    <p className='bg-white border-2 border-black m-0 px-2 py-1 absolute top-[-2px] left-[-6px] skew-x-[-15deg]'>{text}</p>
                    :
                    <p className='bg-white border-2 border-black m-0 px-2 py-1 absolute bottom-[-2px] right-[-6px] skew-x-[-15deg]'>{text}</p>
                :
                <></>
            }
            {open && <div className='absolute backdrop-brightness-50 w-full h-full flex justify-center items-center font-sans gap-2 flex-col'>
                <input type="text" className="w-10/12 max-w-xl px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" value={text} onChange={(e) => setText(e.target.value)} />
                <button className='bg-sky-500 text-white text-sm font-medium px-4 py-2 rounded' onClick={() => setOpen(!open)}>Done</button>
            </div>}
            {data.image
                ?
                <img src={data.image} alt={data.caption} className='w-full min-h-full' onClick={() => setOpen(!open)} />
                :
                <div className='font-sans text-gray-500 flex gap-2 justify-center items-center select-none'>
                    This panel is blank
                    <LuImageOff />
                </div>
            }
            {index === 9 && <p className='bg-white border-2 border-black m-0 px-2 py-1 absolute bottom-[-2px] right-[-6px] skew-x-[-15deg]'>THE END</p>}
        </div>
    )
}

export default ComicSlide