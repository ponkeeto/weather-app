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
} from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { useRef, useState } from "react";

const Weather = () => {
  const { user } = useAuth0();
  const cityRef = useRef();
  const [cityData, setCityData] = useState({ name: "", lat: 0, lon: 0 });
  const [weatherData, setWeatherData] = useState({});
  const weatherDataIsEmpty = Object.entries(weatherData).length === 0;

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
        console.log(dt);
        const date = dt;
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
        {weatherDataIsEmpty ? (
          <>
            <Typography gutterBottom>{user.name}</Typography>
            <Typography gutterBottom>
              https://github.com/{user.nickname}
            </Typography>
            <TextField label="Search city" type="search" inputRef={cityRef} />
            <Button variant="contained" onClick={handleSearchWeather}>
              Display Weather
            </Button>
          </>
        ) : (
          <>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Date (mm/dd/yyyy)</TableCell>
                    <TableCell align="right">Temp (F)</TableCell>
                    <TableCell align="right">Description</TableCell>
                    <TableCell align="right">Pressure</TableCell>
                    <TableCell align="right">Humidity</TableCell>
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
                    <TableCell align="right">
                      {weatherData.description}
                    </TableCell>
                    <TableCell align="right">{weatherData.pressure}</TableCell>
                    <TableCell align="right">{weatherData.humidity}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Button
              variant="contained"
              onClick={() => {
                setWeatherData({});
                setCityData({ name: "", lat: 0, lon: 0 });
              }}
            >
              Back
            </Button>
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default Weather;
