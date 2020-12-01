import React, {useEffect, useState, useReducer} from 'react'
import ImageCard from './ImageCard'

function Favorites() {
  const [favorites, setFavorites] = useState([])
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    fetchAPI()
  }, []);

  const fetchAPI = () => {
    const token = window.localStorage.getItem('token')
    fetch('/api/favorites', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
      // In fetch its easier to use plain promises than async / await
    }).then((resp: any) => resp.json())
    .then((body) => {
      setFavorites(body.data)
    })
  }

  const rerenderParentCallback = () => {
    fetchAPI();
  }

  return (
    <div className="image-container">
      {favorites.length === 0 &&
        <span>You will see your favorites here</span>
      }

      {favorites.length > 0 && favorites.map((e, idx) => {
        return <ImageCard img={e} key={idx} favorites={true} rerender={rerenderParentCallback} />
      })
      }

    </div>
  );
}

export default Favorites;