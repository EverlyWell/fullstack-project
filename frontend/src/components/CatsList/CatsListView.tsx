import { FunctionComponent, useEffect, useState } from "react";
import {
  Alert, Container, Grid, Paper, Snackbar
} from "@mui/material";
import { ICat, ICategory, IPagination } from "../../typings/typings";
import CatCardView from "./CatCardView";
import { fetchCatsResponse, postCatFavorites } from "./utils";
import CatsPaginationView from "./CatsPaginationView";

interface ICatListView {
  category: ICategory | undefined;
}

const CatListView: FunctionComponent<ICatListView> = ({
  category
}) => {
  const [cats, setCats] = useState<Array<ICat>>([]);
  const [pagination, setPagination] = useState<IPagination>({
    count: 9,
    page: 1,
    limit: 9
  });
  const [limit, setLimit] = useState<number>(3);
  const [page, setPage] = useState<number>(1);
  const [order, setOrder] = useState<string>('Asc');
  const [openFavoriteMessage, setOpenFavoriteMessage] = useState<boolean>(false);

  const limits = [3, 6, 9];
  const orders = ['Asc', 'Desc'];

  useEffect(() => {
    async function fetchCatsPrivate() {
      const catsResponse = await fetchCatsResponse(category, limit, page, order);
      setCats(catsResponse.cats);
      setPagination(catsResponse.pagination);
    }
    fetchCatsPrivate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, page, order, category]);

  const handleLimitChange = (evt: any) => setLimit(evt.target.value);

  const handlePageChange = (_evt: any, page: number) => setPage(page);

  const handleOrderChange = (evt: any) => setOrder(evt.target.value);

  const handleAddFavoriteClick = async (id: string) => {
    const response = await postCatFavorites(id);
    if (response.message === 'SUCCESS') {
      setOpenFavoriteMessage(true);
    }
  }

  const handleFavoriteMessageClose = (_event: any) => setOpenFavoriteMessage(false);

  return (
    <Container maxWidth="xl" className="App">
      <Paper>
        <Grid container spacing={2}>
          {cats.map((cat: ICat, index: number) => (
            <CatCardView
              key={`cat_card_view_${index}`}
              cat={cat}
              index={index}
              onAddFavoriteClick={handleAddFavoriteClick}
            />
          ))}
        </Grid>
        <Snackbar
          open={openFavoriteMessage}
          autoHideDuration={6000}
          onClose={handleFavoriteMessageClose}
        >
          <Alert onClose={handleFavoriteMessageClose} severity="success" sx={{ width: '100%' }}>
            Favorite save success!
          </Alert>
        </Snackbar>
      </Paper>
      <Paper sx={{display: 'inline-flex'}}>
        <CatsPaginationView
          limits={limits}
          limit={limit}
          onLimitChange={handleLimitChange}
          pagination={pagination}
          page={page}
          onPageChange={handlePageChange}
          orders={orders}
          order={order}
          onOrderChange={handleOrderChange}
        />
      </Paper>
    </Container>
  );
}

export default CatListView;
