import React from "react";
import { Photo } from "./HomePage";
import { CircularProgress, Grid } from "@material-ui/core";
import {
  removeFromFavorites,
  addToFavorites,
  Favorite,
} from "../../utils/favoritesAPI";
import { getUserId } from "../../utils/userManagement";

interface Props {
  photos: Photo[];
  loading: boolean;
  favorites: Favorite;
  refreshFavorites: () => void;
}

export const PhotoGrid = ({
  photos,
  loading,
  favorites,
  refreshFavorites,
}: Props) => {
  const userId = getUserId() as string;

  const toggleIsFavorite = async (photo: Photo) => {
    if (favorites[photo.id]) {
      await removeFromFavorites(userId, photo.id);
    } else {
      await addToFavorites(userId, photo.id, photo.url);
    }
    refreshFavorites();
    return;
  };

  const getIsFavorite = (photoId: string) => {
    return !!favorites[photoId];
  };

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
              alt={photo.url}
              style={getIsFavorite(photo.id) ? { border: "dashed red" } : {}}
              onClick={() => toggleIsFavorite(photo)}
              width="150px"
              src={photo.url}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
