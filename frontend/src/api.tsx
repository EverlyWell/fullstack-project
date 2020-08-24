const unFavorite = (id: string) => {
  return fetch(`/api/favorites/${id}`, { method: 'DELETE' });
}

const favorite = (giphy_id: string) => {
  const opts = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ favorite: { giphy_id } }),
  };
  return fetch(`/api/favorites`, opts);
}

export {
  unFavorite,
  favorite,
}