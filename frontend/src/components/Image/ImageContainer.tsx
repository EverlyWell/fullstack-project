import React from 'react'

import Image from './Image'

import { favImage } from '../../services/apiClient'

export default function ImagesContainer(props: {imageUrl: string, title: string, className: string, id: string}) {
    const { imageUrl, title, className, id } = props

    const submitFavImage = (event: any) => {
        favImage(id).then((response) => {
            console.log(response)
        })
    }

    return (
        <Image
            imageUrl={imageUrl}
            title={title}
            className={className}
            onChange={submitFavImage}
        />
    )
}
