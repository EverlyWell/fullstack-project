import { ICategory } from "../../typings/typings";

export async function fetchFavsResponse(category: ICategory | undefined, page: number): Promise<any> {
  const categoryIdsParam = category?.id !== undefined && category?.id !== 0 ? `&category_ids=${category.id}` : '';
  const response = await fetch(`http://localhost:3010/api/v1/favourites?page=${page}${categoryIdsParam}`);
  if (response.ok) {
    const favsResponse = await response.json();
    return favsResponse;
  }
}

export async function removeFavResponse(id: string): Promise<any> {
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  };
  const response = await fetch(
    `http://localhost:3010/api/v1/favourites/${id}`,
    requestOptions
  );
  return await response.json();
}
