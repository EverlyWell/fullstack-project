import React from 'react';

import './Image.css'

export default function Image(props: {imageUrl: string, title: string, className: string, onChange: any}) {
    const { imageUrl, title, className, onChange } = props

    return (
        <form>
            <picture className={className}>
                <source srcSet={imageUrl}/>
                <img alt={title} src={imageUrl}/>
                <p>
                    {title}
                </p>
            </picture>
            <input type='checkbox' onChange={onChange}/>
        </form>
    )
}
