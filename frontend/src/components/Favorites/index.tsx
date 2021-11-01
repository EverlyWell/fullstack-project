import { useEffect, useState } from "react";
import { getFavorites, removeFavorite } from "../../services/favorites.service";
import { ICategory, IFav, IPagination } from "../../typings";
import Controls from "../Common/Controls";
import Filters from "../Common/Filters";
import FavoriteModal from "./FavoriteModal";
import FavoritesMessages from "./FavoritesMessages";
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
  const [openFavoriteMessage, setOpenFavoriteMessage] = useState<boolean>(false);

  async function getFavoritesPrivate(category: ICategory | undefined, limit: number, page: number, order: string) {
    const favoritesResponse = await getFavorites(category, limit, page, order);
    setFavorites(favoritesResponse.favs);
    setPagination(favoritesResponse.pagination);
  }

  useEffect(() => {
    getFavoritesPrivate(category, limit, page, order);
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

  const handleFavoriteMessageClose = () => setOpenFavoriteMessage(false);

  const handleRemoveFavorite = async (id: string) => {
    const response = await removeFavorite(id);
    if (response.status === 200) {
      getFavoritesPrivate(category, limit, 1, order);
      setOpenFavoriteMessage(true);
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

        <FavoritesTable
          favorites={favorites}
          handleOpenFavoriteDialog={handleOpenFavoriteDialog}
          handleRemoveFavorite={handleRemoveFavorite}
        />

        <Controls
          limit={limit}
          order={order}
          page={page}
          count={pagination.count}
          handleLimitChange={handleLimitChange}
          handleOrderChange={handleOrderChange}
          handlePageChange={handlePageChange}
        />

        <FavoriteModal
          favorite={favorites[favIdx]}
        />

        <FavoritesMessages
          openFavoriteMessage={openFavoriteMessage}
          handleFavoriteMessageClose={handleFavoriteMessageClose}
        />
      </div>
    </div>
  );
};

export default FavoritesList;
