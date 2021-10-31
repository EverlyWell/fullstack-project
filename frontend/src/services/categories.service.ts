import axios from "axios";
import { ICategory } from "../typings/typings";
import authHeader from "./auth.header";

// TODO: get from env variables
const API_URL = "http://localhost:3010/api/v1/categories";

export async function getCategories(): Promise<ICategory[]> {
  const newCategories = [{ id: 0, name: 'All' }]
  const response = await axios.get(API_URL, { headers: authHeader() });
  if (response.status === 200) {
    return newCategories.concat(response.data);
  } else {
    return newCategories;
  }
};
