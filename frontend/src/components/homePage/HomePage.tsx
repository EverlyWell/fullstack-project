import React, { useState, useEffect } from "react";
import { Box, Paper, Input, makeStyles, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { PhotoGrid } from "./PhotoGrid";
import axios from "axios";

const useStyles = makeStyles((theme) => ({}));

//TODO: store clientID in ENV

export interface Photo {
  id: string;
  url: string;
  favorited?: boolean;
}

const getPhotos = async (q: string): Promise<Photo[]> => {
  const config = {
    headers: {
      Authorization: `Client-ID ${clientId}`,
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
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    getPhotos(searchTerm).then((photos: any) => {
      setLoading(false);
      setPhotos(photos);
    });
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
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
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                handleSearch();
              }
            }}
          />
          <IconButton color="primary" onClick={handleSearch}>
            <SearchIcon style={{ color: "grey" }} />
          </IconButton>
        </Box>
      </Paper>
      <PhotoGrid loading={loading} photos={photos} />
    </Box>
  );
};
