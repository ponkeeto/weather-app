import { Grid, Typography } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";

const Weather = () => {
  const { user } = useAuth0();
  return (
    <Grid
      container
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
      style={{ marginTop: "10vh", minHeight: "90vh" }}
    >
      <Grid
        container
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="flex-start"
        item
        xs={6}
        style={{ padding: "20px", minHeight: "50%", marginTop: "10%" }}
      >
        <Typography>{user.name}</Typography>
        <Typography>https://github.com/{user.nickname}</Typography>
      </Grid>
    </Grid>
  );
};

export default Weather;
