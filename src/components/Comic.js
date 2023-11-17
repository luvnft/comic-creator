import React, { useState } from 'react'
import ComicSlide from './ComicSlide';
import toast from 'react-hot-toast';

const Comic = () => {
    const [images, setImages] = useState([{ caption: "", image: "", text: "" }, { caption: "", image: "", text: "" }, { caption: "", image: "", text: "" }, { caption: "", image: "", text: "" }, { caption: "", image: "", text: "" }, { caption: "", image: "", text: "" }, { caption: "", image: "", text: "" }, { caption: "", image: "", text: "" }, { caption: "", image: "", text: "" }, { caption: "", image: "", text: "" }]);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchImage = async (inputText) => {
        const data = {
            inputs: inputText
        };

        const loadingToast = toast.loading('Loading...');
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
            toast.dismiss(loadingToast);
            toast.success("Image added");
            return result;
        } catch (error) {
            toast.error("Please try again later");
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const getFreeIndex = () => {
        for (let i = 0; i < images.length; i++) {
            if (images[i].image === "")
                return i;
        }
        return -1;
    }

    const handleClickAddImage = async (e) => {
        e.preventDefault();

        const index = getFreeIndex();
        if (index === -1)
            return;

        const updatedImages = images;
        const image = await fetchImage(text);
        const src = URL.createObjectURL(image);

        updatedImages[index] = {
            caption: text,
            image: src,
            text: ""
        };
        setImages(updatedImages);
    }

    return (
        <div className='p-10'>
            <div className='mb-6 flex justify-center items-center'>
                <form className='flex gap-4 justify-center items-center w-9/12 max-w-4xl flex-col sm:flex-row'>
                    <input type="text" className="w-full sm:w-7/12 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" value={text} onChange={(e) => setText(e.target.value)} />
                    <button disabled={text.length === 0 || loading} className='bg-sky-500 disabled:bg-sky-00 text-white text-sm font-medium px-4 py-2 rounded flex justify-center items-center' onClick={handleClickAddImage}>
                        <span>
                            Add image
                        </span>
                    </button>
                </form>
            </div>
            <div className='text-center mb-6'>Click on an image to add text annotations</div>
            <div className="flex flex-wrap font-['Comic_Sans',cursive]">
                {images.map((img, index) => (
                    <ComicSlide data={img} index={index} images={images} setImages={setImages} large={index === 0 || index === 3 || index === 4 || index === 6} key={index} />
                ))}
            </div>
        </div>
    )
}

export default Comic