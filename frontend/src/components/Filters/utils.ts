import { ICategory } from "../../typings/typings";

export async function fetchCategories(): Promise<ICategory[]> {
  const newCategories = [{ id: 0, name: 'All' }]
  const response = await fetch('http://localhost:3010/api/v1/categories');
  if (response.ok) {
    return (newCategories.concat(await response.json()));
  } else {
    return (newCategories);
  }
};
