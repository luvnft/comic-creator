import React, { useState } from 'react'
import ComicSlide from './ComicSlide';

const Comic = () => {
    const [images, setImages] = useState(["", "", "", "", "", "", "", "", "", ""]);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchImage = async (inputText) => {
        const data = {
            inputs: inputText
        };
        console.log(data);

        setLoading(true);
        try {

            const response = await fetch(
                "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
                {
                    headers: {
                        "Accept": "image/png",
                        "Authorization": "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM",
                        "Content-Type": "application/json"
                    },
                    method: "POST",
                    body: JSON.stringify(data),
                }
            );
            const result = await response.blob();
            return result;
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const getFreeIndex = () => {
        for (let i = 0; i < images.length; i++) {
            // console.log(i, ": ", images[i]);
            if (images[i] === "")
                return i;
        }
        return 3;
    }

    const handleClickAddImage = async (e) => {
        e.preventDefault();

        const index = getFreeIndex();
        console.log(index);

        const updatedImages = images;
        const image = await fetchImage(text);
        const src = URL.createObjectURL(image);

        updatedImages[index] = src;

        console.log(updatedImages);
        setImages(updatedImages);
    }

    return (
        <div className='p-5'>
            <div className='mb-6 flex justify-center items-center'>
                <form className='flex gap-4 justify-center items-center w-7/12'>
                    <input type="text" className="w-7/12 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" value={text} onChange={(e) => setText(e.target.value)} />
                    <button disabled={text.length === 0} className='bg-sky-500 disabled:bg-sky-00 text-white text-sm font-medium px-4 py-2 rounded' onClick={handleClickAddImage}>Add image</button>
                </form>
                {loading && <div>
                    Loading
                </div>}
            </div>
            <div className='grid grid-cols-3 gap-1'>
                {images.map((img, index) => (
                    <ComicSlide image={img} key={index} />
                ))}
            </div>
        </div>
    )
}

export default Comic