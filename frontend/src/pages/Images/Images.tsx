import React from 'react';
import './Images.css';

import ImagesList from '../../components/ImagesList';

export default function Images(props: {images: Array<{ title: string, imageUrl: string, id: string }>, loading: boolean}) {
    const { images, loading } = props;

    return (
        <div className="imagesContainer">
            <ImagesList images={images} loading={loading} />
        </div>
    );
}
