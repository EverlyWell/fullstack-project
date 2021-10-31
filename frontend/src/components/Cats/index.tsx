import { useEffect, useState } from "react";

import { ICat, ICategory, IPagination } from '../../typings';
import { getCats } from "../../services/cats.service";
import { saveFavorite } from "../../services/favorites.service";

import Controls from "../Common/Controls";
import Filters from "../Common/Filters";
import CatModal from "./CatModal";
import CatsTable from "./CatsTable";
import CatsMessages from "./CatsMessages";

const CatList = () => {
  const [cats, setCats] = useState<Array<ICat>>([]);
  const [,setPagination] = useState<IPagination>({
    count: 5,
    page: 1,
    limit: 5
  });
  const [categoryId, setCategoryId] = useState<number>(0);
  const [category, setCategory] = useState<ICategory>();
  const [catIdx, setCatIdx] = useState<number>(-1);
  const [limit, setLimit] = useState<number>(5);
  const [page, setPage] = useState<number>(1);
  const [order, setOrder] = useState<string>('Desc');
  const [openFavoriteMessage, setOpenFavoriteMessage] = useState<boolean>(false);


  useEffect(() => {
    async function getCatsPrivate() {
      const catsResponse = await getCats(category, limit, page, order);
      setCats(catsResponse.cats);
      setPagination(catsResponse.pagination);
    }
    getCatsPrivate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, page, order, category]);

  const handleLimitChange = (evt: any) => setLimit(evt.target.value);

  const handlePageChange = (_evt: any, page: number) => setPage(page);

  const handleOrderChange = (evt: any) => setOrder(evt.target.value);

  const handleOpenCatDialog = (idx: string) => {
    setCatIdx(parseInt(idx));
  }

  const handleAddFavoriteClick = async (idx: string) => {
    const id = cats[parseInt(idx)]?.id;
    const response = await saveFavorite(id);
    if (response.status === 200) {
      setOpenFavoriteMessage(true);
    }
  }

  const handleFavoriteMessageClose = () => setOpenFavoriteMessage(false);

  const handleCategoryChange = (categoryId: number, selectedCategory: ICategory) => {
    setCategoryId(categoryId);
    setCategory(selectedCategory);
    setCatIdx(-1);
  }

  return (
    <div className="container">
      <h1>Cats</h1>
      <div className="list row">
        <Filters
          categoryId={categoryId}
          handleCategoryChange={handleCategoryChange}
        />

        <CatsTable
          cats={cats}
          handleOpenCatDialog={handleOpenCatDialog}
          handleAddFavoriteClick={handleAddFavoriteClick}
        />

        <Controls
          limit={limit}
          order={order}
          page={page}
          handleLimitChange={handleLimitChange}
          handleOrderChange={handleOrderChange}
          handlePageChange={handlePageChange}
        />

        <CatModal
          cat={cats[catIdx]}
        />

        <CatsMessages
          openFavoriteMessage={openFavoriteMessage}
          handleFavoriteMessageClose={handleFavoriteMessageClose}
        />
      </div>
    </div>
  );
};

export default CatList;
