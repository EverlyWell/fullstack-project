import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Paper,
  Input,
  IconButton,
  Grid,
  Button,
  Typography,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { PhotoGrid } from "./PhotoGrid";
import axios from "axios";
//@ts-ignore
import { debounce } from "lodash";
import { FavoritesDialog } from "../favoritesDialog/FavoritesDialog";
import { getUserId } from "../../utils/userManagement";
import { getFavorites, Favorite } from "../../utils/favoritesAPI";

export interface Photo {
  id: string;
  url: string;
  favorited?: boolean;
}

const getPhotos = async (q: string): Promise<Photo[]> => {
  const config = {
    headers: {
      Authorization: `Client-ID ${process.env.REACT_APP_CLIENT_ID}`,
    },
  };

  const url = `https://api.imgur.com/3/gallery/search/?q=${q}&mature=false`;
  const res = await axios.get(url, config);
  const photos: Photo[] = [];

  res.data.data.forEach((item: any) => {
    if (item.is_album) {
      item.images.forEach((photo: any) => {
        photos.push({
          id: photo.id,
          url: photo.link,
        });
      });
    }
  });
  return photos;
};

export const HomePage = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [favorites, setFavorites] = useState<Favorite>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const userId = getUserId() as string;

  const refreshFavorites = () => {
    getFavorites(userId).then((f) => {
      setFavorites(f);
    });
  };
  useEffect(() => {
    refreshFavorites();
  }, []);

  useEffect(() => {
    setLoading(true);
    getPhotos(debouncedSearchTerm).then((photos: any) => {
      setLoading(false);
      setPhotos(photos);
    });
  }, [debouncedSearchTerm]);

  const setDebouncedSearchTermCB = useCallback(
    debounce((debouncedSearchTerm: string) => {
      setDebouncedSearchTerm(debouncedSearchTerm);
    }, 500),
    []
  );

  const setTerms = (term: string) => {
    setSearchTerm(term);
    setDebouncedSearchTermCB(term);
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTerms(event.target.value);
  };

  return (
    <Box>
      <Paper>
        <Box style={{ padding: "10px" }}>
          <Input
            placeholder="search"
            disableUnderline
            value={searchTerm}
            onChange={handleChangeInput}
          />
          <IconButton color="primary">
            <SearchIcon style={{ color: "grey" }} />
          </IconButton>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setFavoritesOpen(true)}
          >
            view favorites
          </Button>
        </Box>
      </Paper>
      {searchTerm ? (
        <PhotoGrid
          loading={loading}
          photos={photos}
          favorites={favorites}
          refreshFavorites={refreshFavorites}
        />
      ) : (
        <div>
          <Typography style={{ padding: "30px" }}>
            start typing to see photos or use one of these:
          </Typography>
          <Grid container spacing={5} justify="center" alignItems="center">
            <Grid item>
              <Button
                variant="contained"
                onClick={() => {
                  setTerms("cute puppies");
                }}
              >
                Cute puppies
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                onClick={() => {
                  setTerms("cute kittens");
                }}
              >
                Cute kittens
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                onClick={() => {
                  setTerms("cute piglets");
                }}
              >
                Cute piglets
              </Button>
            </Grid>
          </Grid>
        </div>
      )}
      <FavoritesDialog
        open={favoritesOpen}
        setOpen={setFavoritesOpen}
        favorites={favorites}
      />
    </Box>
  );
};
