import { ICategory } from "../../typings/typings";

export async function fetchCatsResponse(category: ICategory | undefined, limit: number, page: number, order: string): Promise<any> {
  const categoryIdsParam = category?.id !== undefined && category?.id !== 0 ? `&category_ids=${category.id}` : '';
  const response = await fetch(`http://localhost:3010/api/v1/cats?limit=${limit}&page=${page}&order=${order}${categoryIdsParam}`);
  if (response.ok) {
    const catsResponse = await response.json()
    return catsResponse;
  }
}

export async function postCatFavorites(id: string): Promise<any> {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      image_id: id
    })
  };
  const response = await fetch('http://localhost:3010/api/v1/favourites', requestOptions);
  return await response.json();
}
