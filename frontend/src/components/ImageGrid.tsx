import React from 'react';

const ImageGrid = (props: any) => {
  return (
    <div>
      {props.images.map((image: any) => (
        <img key={image.id} src={image.images.preview_gif.url} alt={image.title}></img>
      ))}
    </div>
  );
};

export default ImageGrid;
