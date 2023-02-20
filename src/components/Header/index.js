import WbCloudyIcon from "@mui/icons-material/WbCloudy";
import { AppBar, Grid, Typography } from "@mui/material";
import LogoutButton from "../LogoutButton";

const Header = () => {
  return (
    <AppBar>
      <Grid
        container
        flexWrap="nowrap"
        justifyContent="space-between"
        alignItems="center"
        style={{ padding: "10px", minHeight: "10vh" }}
      >
        <Grid item container alignItems="center">
          <WbCloudyIcon fontSize="large" style={{ marginRight: "20px" }} />
          <Typography>Weather Forecast</Typography>
        </Grid>
        <LogoutButton />
      </Grid>
    </AppBar>
  );
};

export default Header;
