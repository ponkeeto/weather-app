import WbCloudyIcon from '@mui/icons-material/WbCloudy';
import { AppBar, Button, Grid, Typography } from '@mui/material';

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
          <WbCloudyIcon fontSize="large" />
          <Typography>Weather Forecast</Typography>
        </Grid>
        <Button variant="outlined" style={{ background: "white" }}>
          Logout
        </Button>
      </Grid>
    </AppBar>
  );
};

export default Header;