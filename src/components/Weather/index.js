import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { useRef, useState } from "react";

const Weather = () => {
  const theme = useTheme();
  const mobileBreakpoint = useMediaQuery(theme.breakpoints.down("sm"));

  const { user } = useAuth0();
  const cityRef = useRef();
  const [cityData, setCityData] = useState({ name: "", lat: 0, lon: 0 });
  const [weatherData, setWeatherData] = useState({});
  const weatherDataIsEmpty = Object.entries(weatherData).length === 0;

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const apiKey = "38e1aabc856a69d9e6d52dc2f0e7c646";
  const requestUrl = `http://api.openweathermap.org`;

  const handleSearchWeather = async () => {
    getCityCoords(cityRef.current.value);

    const weatherEndpoint = "/data/2.5/weather?";
    const weatherParams = `lat=${cityData.lat}&lon=${cityData.lon}&appid=${apiKey}`;
    const weatherFetchUrl = `${requestUrl}${weatherEndpoint}${weatherParams}`;

    try {
      const response = await fetch(weatherFetchUrl, { method: "GET" });
      if (response.ok) {
        const jsonResponse = await response.json();
        const { dt, weather, main } = jsonResponse;
        const dateVar = new Date(dt * 1000);
        const date = `${months[dateVar.getMonth()]} ${dateVar.getDate()}, ${dateVar.getFullYear()}`
        const description = weather[0].description;
        const { temp, pressure, humidity } = main;
        setWeatherData({ date, temp, description, pressure, humidity });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCityCoords = async (city) => {
    const geocodeEndpoint = "/geo/1.0/direct?";
    const geocodeParams = `q=${city}&limit=1&appid=${apiKey}`;
    const geocodeFetchUrl = `${requestUrl}${geocodeEndpoint}${geocodeParams}`;

    try {
      const response = await fetch(geocodeFetchUrl, { method: "GET" });
      if (response.ok) {
        const jsonResponse = await response.json();
        const { name, lat, lon } = jsonResponse[0];
        setCityData({ name, lat, lon });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const convertKToF = (temp) => {
    const value = ((temp - 273.15) * 9) / 5 + 32;
    return parseInt(value);
  };

  return (
    <Grid
      container
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
      style={{ marginTop: "20vh", minHeight: "80vh" }}
    >
      <Grid
        container
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-start"
        item
        xs={12}
        style={{ padding: "20px", minHeight: "50%", marginTop: 0 }}
      >
        {weatherDataIsEmpty ? (
          <Grid
            container
            flexDirection="column"
            alignItems="center"
            justifyContent="flex-start"
            item
            xs={mobileBreakpoint ? 12 : 6}
          >
            <Typography gutterBottom textAlign="center">
              {user.name}
            </Typography>
            <Typography gutterBottom textAlign="center">
              https://github.com/{user.nickname}
            </Typography>
            <TextField
              label="Search city"
              type="search"
              inputRef={cityRef}
              style={{ margin: "20px 0" }}
            />
            <Button variant="contained" onClick={handleSearchWeather}>
              Display Weather
            </Button>
          </Grid>
        ) : (
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>{cityData.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Date (MMM DD, YYYY)</TableCell>
                    <TableCell align="right">Temp (F)</TableCell>
                    {!mobileBreakpoint && (
                      <>
                        <TableCell align="right">Description</TableCell>
                        <TableCell align="right">Pressure (hPa)</TableCell>
                        <TableCell align="right">Humidity (%)</TableCell>
                      </>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      {weatherData.date}
                    </TableCell>
                    <TableCell align="right">
                      {convertKToF(weatherData.temp)}
                    </TableCell>
                    {!mobileBreakpoint && (
                      <>
                        <TableCell align="right">
                          {weatherData.description}
                        </TableCell>
                        <TableCell align="right">
                          {weatherData.pressure}
                        </TableCell>
                        <TableCell align="right">
                          {weatherData.humidity}
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Grid item style={{ marginTop: "20px" }}>
              <Button
                variant="contained"
                onClick={() => {
                  setWeatherData({});
                  setCityData({ name: "", lat: 0, lon: 0 });
                }}
              >
                Back
              </Button>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default Weather;
