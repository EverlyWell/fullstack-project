import React, { useState } from 'react';
import { Grid } from '@giphy/react-components';
import { GiphyFetch } from '@giphy/js-fetch-api';
import Overlay from './Overlay';

const gf = new GiphyFetch(process.env.REACT_APP_GIPHY_API_KEY!)
const LIMIT = 10;

export default function Search({ isGifFav, toggleFavorite }: any) {
  const [term, setTerm] = useState('animals');
    
  const handleChange = (e: any) => setTerm(e.target.value);
  
  const fetchGifs = (offset: number) => gf.search(term, { offset, limit: LIMIT });

  return (
    <div>
      <h1 style={{ margin: '1em 0 0 1em' }}>Search for a Gif</h1>
      <section className="header">
        <input type="text" placeholder="Search" value={term} onChange={handleChange} />
      </section>
      <Grid
        key={term}
        columns={3}
        fetchGifs={fetchGifs}
        gutter={4}
        overlay={Overlay({ isGifFav, toggleFavorite })}
        noResultsMessage={<div>No results</div>}
        width={1220}
      />
    </div>
  )
}