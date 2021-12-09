import React, { useState, useEffect } from 'react';

import Images from './Images'

import { getGiphyImages } from '../../services/apiClient'

export default function ImagesContainer(props: {params: {query: string}}) {
    const { params: { query } } = props
    console.log(query)

    const [loading, setLoading] = useState(false)
    const [images, setImages] = useState([])

    useEffect(() => {
        setLoading(true)
        getGiphyImages(query)
            .then(images => {
                setImages(images)
                setLoading(false)
            })
    },[query])

    return <Images images={images} loading={loading} />
}
