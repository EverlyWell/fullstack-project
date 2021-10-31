import axios from "axios";
import { favoritesApiUrl } from "../api";
import authHeader from "./auth.header";

export async function saveFavorite(id: string): Promise<any> {
  return axios.post(favoritesApiUrl, { image_id: id }, { headers: authHeader() });
}
