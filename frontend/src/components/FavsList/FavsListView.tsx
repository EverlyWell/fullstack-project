import { FunctionComponent, useEffect, useState } from "react";
import {
  Alert, Container, Grid, Paper, Snackbar
} from "@mui/material";
import { ICategory, IFav, IPagination } from "../../typings/typings";
import { fetchFavsResponse, removeFavResponse } from "./utils";
import FavCardView from "./FavCardView";
import FavsPaginationView from "./FavsPaginationView";

interface IFavsListView {
  category: ICategory | undefined;
}

const FavsListView: FunctionComponent<IFavsListView> = ({
  category
}) => {
  const [favs, setFavs] = useState<Array<IFav>>([]);
  const [pagination, setPagination] = useState<IPagination>({
    count: 3,
    page: 1,
    limit: 3
  });
  const [page, setPage] = useState<number>(1);
  const [openFavoriteMessage, setOpenFavoriteMessage] = useState<boolean>(false);

  async function fetchFavsPrivate(category: ICategory | undefined, page: number) {
    const favsResponse = await fetchFavsResponse(category, page);
    setFavs(favsResponse.favs);
    setPagination(favsResponse.pagination);
  }

  useEffect(() => {
    fetchFavsPrivate(category, page);
  }, [category, page]);

  const handlePageChange = (_evt: any, page: number) => setPage(page);

  const handleRemoveFavoriteClick = async (id: string) => {
    const response = await removeFavResponse(id);
    if (response.message === 'SUCCESS') {
      fetchFavsPrivate(category, page);
      setOpenFavoriteMessage(true);
    }
  }

  const handleFavoriteMessageClose = (_event: any) => setOpenFavoriteMessage(false);

  return (
    <Container maxWidth="xl" className="App">
      <Paper>
        <Grid container spacing={2}>
          {favs.map((fav: IFav, index: number) => (
            <FavCardView
              key={`fav_card_view_${index}`}
              fav={fav}
              index={index}
              onRemoveFavoriteClick={handleRemoveFavoriteClick}
            />
          ))}
        </Grid>
        <Snackbar
          open={openFavoriteMessage}
          autoHideDuration={6000}
          onClose={handleFavoriteMessageClose}
        >
          <Alert onClose={handleFavoriteMessageClose} severity="success" sx={{ width: '100%' }}>
            Favorite remove success!
          </Alert>
        </Snackbar>
      </Paper>
      <Paper sx={{display: 'inline-flex'}}>
        <FavsPaginationView
          pagination={pagination}
          page={page}
          onPageChange={handlePageChange}
        />
      </Paper>
    </Container>
  );
}

export default FavsListView;
