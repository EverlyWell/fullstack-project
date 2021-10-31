import axios from "axios";
import authHeader from "./auth.header";

// TODO: get from env variables
const API_URL = "http://localhost:3010/api/v1/favourites";

export async function saveFavourite(id: string): Promise<any> {
  return axios.post(API_URL, { image_id: id }, { headers: authHeader() });
}
