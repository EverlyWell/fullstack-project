import React, { useState, useEffect } from 'react';

import ImagesList from '../../components/ImagesList';

import { getFavedImages } from '../../services/apiClient'

export default function FavsContainer() {
    const [loading, setLoading] = useState(false)
    const [images, setImages] = useState([])

    useEffect(() => {
        setLoading(true)
        getFavedImages()
            .then((images: any) => {
                setImages(images)
                setLoading(false)
            })
    }, [])

    if(loading) {
        return (
            <div>
                cargando...
            </div>
        )
    }

    return (
        <div className="imagesContainer">
            <ImagesList images={images} loading={loading} />
        </div>
    );
}
