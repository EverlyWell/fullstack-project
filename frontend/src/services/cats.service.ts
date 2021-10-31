import axios from "axios";
import { catsApiUrl } from "../api";
import { ICategory } from "../typings";
import authHeader from "./auth.header";

export async function getCats(category: ICategory | undefined, limit: number, page: number, order: string): Promise<any> {
  const categoryIdsParam = category?.id !== undefined && category?.id !== 0 ? `&category_ids=${category.id}` : '';
  const response = await axios.get(
    `${catsApiUrl}?limit=${limit}&page=${page}&order=${order}${categoryIdsParam}`,
    { headers: authHeader() });

  if (response.status === 200) {
    return response.data;
  };
};
