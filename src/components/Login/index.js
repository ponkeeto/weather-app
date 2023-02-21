import { Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import Wrapper from "../AuthWrapper";
import LoginButton from "../LoginButton";

const Login = () => {
  const theme = useTheme();
  const mobileBreakpoint = useMediaQuery(theme.breakpoints.down('xs'))

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
        xs={mobileBreakpoint ? 12 : 6}
        style={{ padding: "20px", minHeight: "50%", marginTop: "10%" }}
      >
        <Wrapper>
          <Grid item xs={12} style={{ marginBottom: "15px" }}>
            <Typography gutterBottom textAlign="left" variant="h6">
              Welcome to the weather forecast web application. Please login your
              Github user to use the application and view the weather in your
              city.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <LoginButton />
          </Grid>
        </Wrapper>
      </Grid>
    </Grid>
  );
};

export default Login;
