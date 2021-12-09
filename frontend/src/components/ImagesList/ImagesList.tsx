import React from 'react'

import Image from '../../components/Image'

import './ImagesList.css'

export default function ImagesList(props: {images: Array<{ title: string, imageUrl: string, id: string }>,
    loading: boolean
    }) {
    const { images, loading } = props;

    if(loading) {
        return (
            <div>
                cargando...
            </div>
        )
    }

    return (
        <ul className='imagesList'>
            {
                images.map(({title, imageUrl, id}) =>
                <li key={id}>
                    <Image
                        key={id}
                        title={title}
                        imageUrl={imageUrl}
                        className={'Image'}
                    />
                </li>
                )
            }
        </ul>
    )
}
