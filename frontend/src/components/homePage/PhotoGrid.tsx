import React, { useState } from "react";
import { Photo } from "./HomePage";
import { CircularProgress, Grid } from "@material-ui/core";

const setIsFavorite = (id: string, status: boolean) => {
  localStorage.setItem(id, String(status));
};

const toggleFavorite = (id: string) => {
  const isFavorite = getIsFavorite(id);
  setIsFavorite(id, !isFavorite);
};

const getIsFavorite = (id: string) => {
  return !!localStorage.getItem(id);
};

interface Props {
  photos: Photo[];
  loading: boolean;
}

export const PhotoGrid = ({ photos, loading }: Props) => {
  // const [favorites, setFavorites] = useState();
  if (loading) return <CircularProgress />;
  if (!photos.length)
    return <div> type in a search phrase to see cat photos </div>;
  return (
    <div>
      Here are your pictures:
      <Grid spacing={3} container>
        {photos.map((photo) => (
          <Grid key={photo.id} item>
            <img
              style={getIsFavorite(photo.id) ? { border: "dashed red" } : {}}
              onClick={() => toggleFavorite(photo.id)}
              width="150px"
              src={photo.url}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
