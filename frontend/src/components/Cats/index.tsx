import { useEffect, useState } from "react";

import { ICat, ICategory, IPagination } from '../../typings';
import { getCats } from "../../services/cats.service";
import { saveFavorite } from "../../services/favorites.service";

import Controls from "../Common/Controls";
import Filters from "../Common/Filters";
import Messages from "../Common/Messages";
import CatModal from "./CatModal";
import CatsTable from "./CatsTable";

const CatList = () => {
  const [cats, setCats] = useState<Array<ICat>>([]);
  const [pagination, setPagination] = useState<IPagination>({
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
  const [message, setMessage] = useState<string>('');
  const [variant,] = useState<string>('success');
  const [openMessage, setOpenMessage] = useState<boolean>(false);


  useEffect(() => {
    async function getCatsPrivate() {
      try {
        const catsResponse = await getCats(category, limit, page, order);
        setCats(catsResponse.cats);
        setPagination(catsResponse.pagination);
      } catch (e) {
        console.log(e);
      }
    }
    getCatsPrivate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, page, order, category]);

  const handleLimitChange = (evt: any) => setLimit(evt.target.value);

  const handlePageChange = (_evt: any, page: number) => {
    setPage(page)
    setCatIdx(-1);
  };

  const handleOrderChange = (evt: any) => setOrder(evt.target.value);

  const handleOpenCatDialog = (idx: string) => {
    setCatIdx(parseInt(idx));
  }

  const handleAddFavorite = async (id: string) => {
    const response = await saveFavorite(id);
    if (response.status === 200) {
      setMessage('Favorite save success!');
      setOpenMessage(true);
    }
  }

  const handleMessageClose = () => {
    setMessage('');
    setOpenMessage(false);
  }

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
      </div>

      <div className="list row">
        <CatsTable
          cats={cats}
          handleOpenCatDialog={handleOpenCatDialog}
          handleAddFavorite={handleAddFavorite}
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
        <CatModal
          cat={cats[catIdx]}
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

export default CatList;
