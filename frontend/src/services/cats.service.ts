import axios from "axios";
import { ICategory } from "../typings/typings";
import authHeader from "./auth.header";

// TODO: get from env variables
const API_URL = "http://localhost:3010/api/v1/cats";

export async function getCats(category: ICategory | undefined, limit: number, page: number, order: string): Promise<any> {
  const categoryIdsParam = category?.id !== undefined && category?.id !== 0 ? `&category_ids=${category.id}` : '';
  const response = await axios.get(
    `${API_URL}?limit=${limit}&page=${page}&order=${order}${categoryIdsParam}`,
    { headers: authHeader() });

  if (response.status === 200) {
    return response.data;
  };
};
