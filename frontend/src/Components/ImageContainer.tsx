import React from 'react'
import Image from './Image'

const ImageContainer: any = (props: {images: any}) => {
    return (
        <div>
          {props.images.map((image:any) => (
            <Image key={image.id} image={image} />
          ))}
        </div> 
    );
}

export default ImageContainer;
