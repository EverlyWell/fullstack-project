import axios from "axios";
import { getToken } from "./AuthenticationService";

const createFavoriteUrl = '/api/v1/favorites';
const deleteFavoriteUrl = '/api/v1/favorites/delete';

export const createFavorite = async (image: any) => {
  await axios.post(createFavoriteUrl, {
      favorite: {
        name: image.title,
        giphy_id: image.id,
        url: image.images.preview_gif.url
      }
    },  
    { 
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    }
  );
}

export const removeFavorite = async (image: any) => {
  await axios.post(deleteFavoriteUrl, { 
      favorite: {
        giphy_id: image.id
      }
    },
    { 
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    }
  );
}
