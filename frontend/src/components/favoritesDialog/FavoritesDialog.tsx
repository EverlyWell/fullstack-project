import React, { useState } from "react";
import { Dialog, DialogTitle, Grid, DialogContent } from "@material-ui/core";

const favorites = [
  "https://i.imgur.com/PhHIVEvh.gif",
  "https://i.imgur.com/H2D5pIY.jpg",
];

interface Props {
  open: boolean;
  setOpen: (x: boolean) => void;
}

export const FavoritesDialog = ({ open, setOpen }: Props) => {
  const handleClose = () => setOpen(false);
  return (
    <Dialog fullWidth maxWidth={"lg"} onClose={handleClose} open={open}>
      <DialogTitle>Favorites</DialogTitle>
      <DialogContent>
        <Grid spacing={3} container>
          {favorites.map((photo) => (
            <Grid key={photo} item>
              <img width="150px" src={photo} />
            </Grid>
          ))}
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
