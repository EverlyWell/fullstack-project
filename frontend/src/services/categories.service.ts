import axios from "axios";
import { categoriesApiUrl } from "../api";
import { ICategory } from "../typings";
import authHeader from "./auth.header";

export async function getCategories(): Promise<ICategory[]> {
  const newCategories = [{ id: 0, name: 'All' }]
  const response = await axios.get(categoriesApiUrl, { headers: authHeader() });
  if (response.status === 200) {
    return newCategories.concat(response.data);
  } else {
    return newCategories;
  }
};
