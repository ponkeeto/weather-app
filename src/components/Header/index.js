import WbCloudyIcon from "@mui/icons-material/WbCloudy";
import { AppBar, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import LogoutButton from "../LogoutButton";

const Header = () => {
  const theme = useTheme();
  const mobileBreakpoint = useMediaQuery(theme.breakpoints.down('xs'))

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
          <Typography>{mobileBreakpoint ? "" : "Weather Forecast"}</Typography>
        </Grid>
        <LogoutButton />
      </Grid>
    </AppBar>
  );
};

export default Header;
