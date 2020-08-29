import React, { useState, useEffect } from "react";
import { Box, Paper, Input, makeStyles } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { PhotoGrid } from "./PhotoGrid";

const useStyles = makeStyles((theme) => ({}));

const mockPhotoOne = {
  url: "https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png",
};

const mockPhotoTwo = {
  url:
    "https://www.humanesociety.org/sites/default/files/styles/1240x698/public/2020-07/kitten-510651.jpg?h=f54c7448&itok=ZhplzyJ9",
};

const mockPhotos = [mockPhotoOne, mockPhotoTwo];

export interface Photo {
  url: string;
  favorited?: boolean;
}

const getPhotos = async (): Promise<Photo[]> => {
  //todo call API for getting photos
  return mockPhotos;
};

export const HomePage = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!searchTerm) return;
    setLoading(true);
    getPhotos().then((photos: any) => {
      setLoading(false);
      setPhotos(photos);
    });
  }, [searchTerm]);

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
            endAdornment={<SearchIcon style={{ color: "grey" }} />}
          />
        </Box>
      </Paper>
      <PhotoGrid loading={loading} photos={photos} />
    </Box>
  );
};
