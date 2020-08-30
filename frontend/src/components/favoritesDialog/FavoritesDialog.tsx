import React from "react";
import { Dialog, DialogTitle, Grid, DialogContent } from "@material-ui/core";
import { Favorite } from "../../utils/favoritesAPI";

interface Props {
  open: boolean;
  setOpen: (x: boolean) => void;
  favorites: Favorite;
}

export const FavoritesDialog = ({ open, setOpen, favorites }: Props) => {
  const handleClose = () => setOpen(false);
  return (
    <Dialog fullWidth maxWidth={"lg"} onClose={handleClose} open={open}>
      <DialogTitle>Favorites</DialogTitle>
      <DialogContent>
        <Grid spacing={3} container>
          {Object.entries(favorites).map(([key, value]) => (
            <Grid key={key} item>
              <img alt={value.photo_url} width="150px" src={value.photo_url} />
            </Grid>
          ))}
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
