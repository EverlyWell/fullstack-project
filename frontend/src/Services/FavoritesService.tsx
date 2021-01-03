import axios from "axios";

const createFavoriteUrl = '/api/v1/favorites';
const deleteFavoriteUrl = '/api/v1/favorites/delete';

export const createFavorite = async (image: any) => {
  await axios.post(createFavoriteUrl, { favorite: {
    name: image.title,
    giphy_id: image.id,
    url: image.images.preview_gif.url
  }})
}

export const removeFavorite = async (image: any, previouslyStored = false) => {
  const id = previouslyStored ? image.giphy_id : image.id;
  await axios.post(deleteFavoriteUrl, { favorite: {
    giphy_id: id
  }})
}
