import React, { useEffect, useState } from 'react'

const Comic = () => {
    const [image, setImage] = useState();
    const query = async (data) => {
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
    }

    useEffect(() => {
        query({ "inputs": "Astronaut riding a horse" }).then((response) => {
            // Use image
            console.log(response);
            const src = URL.createObjectURL(response);
            // console.log(src);
            setImage(src);
        });
    }, [])

    return (
        <div>
            Comic
            <img src={image} />
        </div>
    )
}

export default Comic