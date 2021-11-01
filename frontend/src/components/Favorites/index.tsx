import { useEffect, useState } from "react";
import { getFavorites, removeFavorite } from "../../services/favorites.service";
import { ICategory, IFav, IPagination } from "../../typings";
import Controls from "../Common/Controls";
import Filters from "../Common/Filters";
import Messages from "../Common/Messages";
import FavoriteModal from "./FavoriteModal";
import FavoritesTable from "./FavoritesTable";

const FavoritesList = () => {
  const [favorites, setFavorites] = useState<Array<IFav>>([]);
  const [pagination, setPagination] = useState<IPagination>({
    count: 5,
    page: 1,
    limit: 5
  });
  const [categoryId, setCategoryId] = useState<number>(0);
  const [category, setCategory] = useState<ICategory>();
  const [favIdx, setFavIdx] = useState<number>(-1);
  const [limit, setLimit] = useState<number>(5);
  const [page, setPage] = useState<number>(1);
  const [order, setOrder] = useState<string>('Desc');
  const [message, setMessage] = useState<string>('');
  const [variant,] = useState<string>('success');
  const [openMessage, setOpenMessage] = useState<boolean>(false);

  async function getFavoritesPrivate(category: ICategory | undefined, limit: number, page: number, order: string) {
    const favoritesResponse = await getFavorites(category, limit, page, order);
    setFavorites(favoritesResponse.favs);
    setPagination(favoritesResponse.pagination);
  }

  useEffect(() => {
    try {
      getFavoritesPrivate(category, limit, page, order);
    } catch (e) {
      console.log(e);
    }
  }, [limit, page, order, category]);

  const handleLimitChange = (evt: any) => setLimit(evt.target.value);

  const handlePageChange = (_evt: any, page: number) => {
    setPage(page)
    setFavIdx(-1);
  };

  const handleOrderChange = (evt: any) => setOrder(evt.target.value);

  const handleOpenFavoriteDialog = (idx: string) => {
    setFavIdx(parseInt(idx));
  }

  const handleMessageClose = () => setOpenMessage(false);

  const handleRemoveFavorite = async (id: string) => {
    const response = await removeFavorite(id);
    if (response.status === 200) {
      getFavoritesPrivate(category, limit, 1, order);
      setMessage('Favorite removed successfully!');
      setOpenMessage(true);
    }
  }

  const handleCategoryChange = (categoryId: number, selectedCategory: ICategory) => {
    setCategoryId(categoryId);
    setCategory(selectedCategory);
    setFavIdx(-1);
  }

  return (
    <div className="container">
      <h1>Favorites</h1>
      <div className="list row">
        <Filters
          categoryId={categoryId}
          handleCategoryChange={handleCategoryChange}
        />
      </div>

      <div className="list row">
        <FavoritesTable
          favorites={favorites}
          handleOpenFavoriteDialog={handleOpenFavoriteDialog}
          handleRemoveFavorite={handleRemoveFavorite}
        />
      </div>

      <div className="list row">
        <Controls
          limit={limit}
          order={order}
          page={page}
          count={pagination.count}
          handleLimitChange={handleLimitChange}
          handleOrderChange={handleOrderChange}
          handlePageChange={handlePageChange}
        />
      </div>

      <div className="list row">
        <FavoriteModal
          favorite={favorites[favIdx]}
        />

        <Messages
          message={message}
          variant={variant}
          openMessage={openMessage}
          handleMessageClose={handleMessageClose}
        />
      </div>
    </div>
  );
};

export default FavoritesList;
