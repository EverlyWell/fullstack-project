import React from 'react';
import {Card, Image, Icon} from 'semantic-ui-react'

function ImageCard(props: any) {
  const setFavorite = async (type: string) => {
    const method = type === 'destroy' ? 'DELETE' : 'POST'
    const url = type === 'destroy' ? `/api/favorites/${props.img.id}` :  '/api/favorites'
    const token  = window.localStorage.getItem('token')
    await fetch(url, {
      method,
      body: JSON.stringify({favorite: {giphy_id: props.img.id}}),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })

    props.rerender()
  }

  const isFavorited = props.favorites || props.img.favorited ? true : false;

  return (
       <Card>
        <Image src={props.img.images.downsized.url} wrapped ui={false} />
        <Card.Content extra>
          <a>
            {isFavorited &&
                <Icon name='heart' onClick={() => setFavorite('destroy')}/>
            }

            {!isFavorited &&
              <Icon name='heart outline' onClick={() => setFavorite('create')}/>
            }
          </a>
        </Card.Content>
      </Card>
  );
}

export default ImageCard;