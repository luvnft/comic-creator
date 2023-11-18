import React, { useEffect, useRef, useState } from 'react'
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import axios from "axios"
import { FaShareNodes } from "react-icons/fa6";
import { AiOutlineClose } from "react-icons/ai";
import toast from 'react-hot-toast';

const SnapShot = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [shareableLink, setShareableLink] = useState("");
    const [snapshotUrl, setSnapshotUrl] = useState();
    const [loading, setLoading] = useState(false);
    const modalEl = useRef();
    const buttonRef = useRef();

    const handleClick = () => {
        if (modalOpen)
            setModalOpen(false);
        else {
            setModalOpen(true);
            captureAndShowModal();
        }
    }

    const captureAndShowModal = () => {
        const contentElement = document.getElementById('comic');

        html2canvas(contentElement).then(canvas => {
            const dataUrl = canvas.toDataURL('image/png');
            setSnapshotUrl(dataUrl);
        });
    };

    const handleClickDownload = () => {
        saveAs(snapshotUrl, 'comic_strip.png');
        toast.success("Comic strip saved to device");
    };

    const handleShare = async () => {
        setLoading(true);
        try {
            const data = {
                "file": snapshotUrl,
                "upload_preset": "comic_creator",
                "cloud_name": "dmlsogftl"
            }
            const response = await axios.post('https://api.cloudinary.com/v1_1/dmlsogftl/image/upload', data);
            setShareableLink(response.data.url);
        } catch (error) {
            toast.error("Unable to generate link. Please try again later.");
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleClickCopyLink = () => {
        navigator.clipboard.writeText(shareableLink);
        toast.success("Link copied to clipboard");
    };

    useEffect(() => {
        const handler = (event) => {
            if (!modalEl.current || buttonRef?.current?.contains(event.target)) {
                return;
            }
            if (!modalEl.current.contains(event.target)) {
                setModalOpen(false);
            }
        };
        document.addEventListener("click", handler, true);
        return () => {
            document.removeEventListener("click", handler);
        };
    }, []);


    return (
        <div>
            <button ref={buttonRef} onClick={handleClick} className='bg-white text-lg text-sky-500 sm:bg-sky-500 sm:text-white sm:text-sm font-medium px-4 py-2 rounded flex justify-center items-center gap-2'>
                <FaShareNodes />
                <span className='hidden sm:block'>Share</span>
            </button>
            {modalOpen && (
                <div className='absolute left-[5%] right-[5%] w-[90%] sm:w-96 bg-white rounded-md shadow-lg z-10 top-16 sm:right-10 sm:left-auto border' ref={modalEl}>
                    <div className='flex justify-between items-center p-5 border-b'>
                        <span className='text-gray-800 font-semibold'>
                            Share this comic
                        </span>
                        <AiOutlineClose className='text-gray-400 cursor-pointer' onClick={handleClick} />
                    </div>
                    <div className='p-5 border-b'>
                        <div className='flex justify-between text-sm mb-2'>
                            <span className='text-gray-600 font-medium'>Link to share</span>
                            {
                                loading
                                    ?
                                    <span className='text-gray-400'>Generating...</span>
                                    :
                                    shareableLink ?
                                        <span className='text-sky-500 font-medium'>Generate link</span>
                                        :
                                        <span className='text-sky-500 font-medium hover:text-sky-600 cursor-pointer' onClick={handleShare}>Generate link</span>
                            }
                        </div>
                        <input type="text" className="text-gray-600 w-full mb-2 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none" disabled value={shareableLink} />
                        <div className='text-xs text-gray-400'>Share your comic strip with friends and followers to spread the laughter!</div>
                        <div className='flex justify-end'>
                            <button disabled={!shareableLink} className='disabled:bg-sky-300 bg-sky-500 text-white font-medium  px-4 py-2 text-sm rounded' onClick={handleClickCopyLink}>Copy link</button>
                        </div>
                    </div>
                    <div className='p-5'>
                        <div className='text-gray-600 font-medium text-sm mb-2'>Download</div>
                        <div className='text-xs text-gray-400'>Download your comic strip to keep a copy for yourself or share it offline.</div>
                        <div className='flex justify-end'>
                            <button className='bg-sky-500 text-white font-medium  px-4 py-2 text-sm rounded' onClick={handleClickDownload}>Download</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default SnapShot