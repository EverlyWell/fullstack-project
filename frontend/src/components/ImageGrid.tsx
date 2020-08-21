import React from 'react';

import Image from './Image';

const ImageGrid = ({images, favorites}: {images: Array<any>, favorites: Array<string>}) => {
  return (
    <div>
      {images.map((image: any) => (
        <Image
          key={image.id}
          image={{
            id: image.id,
            url: image.images.preview_gif.url,
            title: image.title,
          }}
          favorite={favorites.find(f => f === image.id) ? true : false}
        />
      ))}
    </div>
  );
};

export default ImageGrid;
