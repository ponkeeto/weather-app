import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Grid } from "@mui/material";

function LogoutButton() {
  const { isAuthenticated, logout } = useAuth0();

  return (
    isAuthenticated && (
      <Grid container justifyContent="flex-end">
        <Button
          variant="outlined"
          style={{ background: "white" }}
          onClick={() => {
            logout({
              logoutParams: {
                returnTo: window.location.origin,
              },
            });
          }}
        >
          Log out
        </Button>
      </Grid>
    )
  );
}

export default LogoutButton;
