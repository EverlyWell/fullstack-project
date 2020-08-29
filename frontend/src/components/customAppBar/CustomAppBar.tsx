import React, { useState } from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

export const CustomAppBar = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">{"cat image search"}</Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};
