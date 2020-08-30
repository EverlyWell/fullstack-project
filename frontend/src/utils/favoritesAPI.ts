import axios from "axios";

export interface Favorite {
  [key: string]: {
    created_at: string;
    id: number;
    photo_id: string;
    photo_url: string;
    updated_at: string;
    user_id: string;
  };
}

export const getFavorites = async (user_id: string): Promise<Favorite> => {
  console.log("getting favs");
  const url = `http://localhost:3010/api/favorites/?user_id=${user_id}`;
  const { data } = await axios.get(url);
  console.log("res from getfavs", data);
  const favs = {};
  Object.entries(data).forEach(([key, value]) => {
    //@ts-ignore
    favs[value.photo_id] = value;
  });
  return favs;
};

export const addToFavorites = async (
  user_id: string,
  photo_id: string,
  photo_url: string
) => {
  const url = `http://localhost:3010/api/favorites/`;
  await axios.post(url, {
    user_id,
    photo_id,
    photo_url,
  });
  return;
};

export const removeFromFavorites = async (
  user_id: string,
  photo_id: string
) => {
  const url = `http://localhost:3010/api/favorites/1?user_id=${user_id}&photo_id=${photo_id}`;
  await axios.delete(url);
  return;
};
