import React from 'react';

import './Image.css'

export default function Image(props: {imageUrl: string, title: string, className: string}) {
    const { imageUrl, title, className } = props

    return (
        <picture className={className}>
            <source srcSet={imageUrl}/>
            <img alt={title} src={imageUrl}/>
            <p>
                {title}
            </p>
        </picture>
    )
}
