import React from 'react'

const ComicSlide = (props) => {
    const { image } = props;
    return (
        <div className='bg-white shadow-sm'>
            ComicSlide

            {/* TODO: change alt description */}
            <img src={image} alt={"comic-slide"} />
        </div>
    )
}

export default ComicSlide