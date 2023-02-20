import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';

function LoginButton() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  return (
    !isAuthenticated && (
      <Button variant="contained" onClick={loginWithRedirect}>
        Log in
      </Button>
    )
  );
}

export default LoginButton;