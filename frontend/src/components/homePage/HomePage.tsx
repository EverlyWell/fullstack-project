import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Paper,
  Input,
  makeStyles,
  IconButton,
  Grid,
  Button,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { PhotoGrid } from "./PhotoGrid";
import axios from "axios";
//@ts-ignore
import { debounce } from "lodash";

const useStyles = makeStyles((theme) => ({}));

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
  console.log("res,", res);
  const photos: Photo[] = [];

  const parsedRes = res.data.data.forEach((item: any) => {
    if (item.is_album) {
      item.images.forEach((photo: any) => {
        photos.push({
          id: photo.id,
          url: photo.link,
        });
      });
    }
  });

  console.log("parsedRes", parsedRes);
  console.log("photos", photos);

  return photos;
};

export const HomePage = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

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
        <Box>
          <Input
            placeholder="search"
            disableUnderline
            value={searchTerm}
            onChange={handleChangeInput}
          />
          <IconButton color="primary">
            <SearchIcon style={{ color: "grey" }} />
          </IconButton>
        </Box>
      </Paper>
      {searchTerm ? (
        <PhotoGrid loading={loading} photos={photos} />
      ) : (
        <div>
          start typing to see photos or use one of these:
          <Grid container>
            <Grid item>
              <Button
                onClick={() => {
                  setTerms("cute puppies");
                }}
              >
                Cute puppies
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={() => {
                  setTerms("cute kittens");
                }}
              >
                Cute kittens
              </Button>
            </Grid>
            <Grid item>
              <Button
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
    </Box>
  );
};
