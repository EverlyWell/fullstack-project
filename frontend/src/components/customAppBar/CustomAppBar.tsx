import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

export const CustomAppBar = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">{"image search"}</Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};
