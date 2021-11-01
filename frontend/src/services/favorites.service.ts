import axios from "axios";
import { favoritesApiUrl } from "../api";
import { ICategory } from "../typings";
import authHeader from "./auth.header";

export async function getFavorites(category: ICategory | undefined, limit: number, page: number, order: string): Promise<any> {
  const categoryIdsParam = category?.id !== undefined && category?.id !== 0 ? `&category_ids=${category.id}` : '';
  const response = await axios.get(
    `${favoritesApiUrl}?limit=${limit}&page=${page}&order=${order}${categoryIdsParam}`,
    { headers: authHeader() }
  );
  if (response.status === 200) {
    return response.data;
  };
}

export async function saveFavorite(id: string): Promise<any> {
  return axios.post(favoritesApiUrl, { image_id: id }, { headers: authHeader() });
}

export async function removeFavorite(id: string): Promise<any> {
  return axios.delete(`${favoritesApiUrl}/${id}`, { headers: authHeader() });
}
