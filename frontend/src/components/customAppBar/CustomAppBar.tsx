import React from "react";
import { AppBar, Toolbar, Typography, Button, Grid } from "@material-ui/core";
import { isLoggedIn, getUserId, logOut } from "../../userManagement";

export const CustomAppBar = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">{"image search"}</Typography>
          {isLoggedIn() && (
            <div style={{ marginLeft: "auto" }}>
              <Grid container spacing={1} justify="center" alignItems="center">
                <Grid item>
                  <Typography>user id: {getUserId()}</Typography>
                </Grid>
                <Grid item>
                  <Button variant="contained" onClick={logOut}>
                    log out
                  </Button>
                </Grid>
              </Grid>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};
