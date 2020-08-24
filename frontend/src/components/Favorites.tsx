import React, { useState, useEffect } from 'react';
import { Gif } from '@giphy/react-components';
import { GiphyFetch } from '@giphy/js-fetch-api';
import Overlay from './Overlay';

const gf = new GiphyFetch(process.env.REACT_APP_GIPHY_API_KEY!)

export default function Favorites({ collection, isGifFav, toggleFavorite }: any) {
  const [gifs, setGifs] = useState([] as any);

  useEffect(() => {
    if (!collection.length) return;
    gf.gifs(collection).then(({ data }) => setGifs(data));
  })
  
  const gifComponents = gifs.map((gif: any) => (
    <div className="col" key={gif.id}>
      <Gif width={404} gif={gif} overlay={Overlay({ isGifFav, toggleFavorite })} />
    </div>
    )
  );
  
  return (
    <div>
      <h1 className="header">Favorites</h1>
      <div className="favorites">
        {collection.length ? gifComponents : "No favorites"}
      </div>
    </div>
  )
}