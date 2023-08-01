import { createContext, useState, useEffect } from "react";

export const DataContext = createContext();

export function DataContextProvider({ children }) {
  const [city, setCity] = useState("london");
  const [weather, setWeather] = useState([]);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [found, setFound] = useState(false);
  const [loadingForecast, setLoadingForecast] = useState(true);
  const [foundForecast, setFoundForecast] = useState(false);
  const [coords, setCoords] = useState({});
  const apiKey = import.meta.env.VITE_API_KEY
  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    )
      .then((response) => response.json())
      .then((jsonData) => {
        setWeather(jsonData);
        jsonData.cod === 200 ? setFound(true) : setFound(false);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });

    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
    )
      .then((response) => response.json())
      .then((jsonData) => {
        setForecast(jsonData);
        jsonData.cod === "200"
          ? setFoundForecast(true)
          : setFoundForecast(false);
        setLoadingForecast(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [city]);

  useEffect(() => {
    if (Object.keys(coords).length) {
      fetch(
        `https://geocodeapi.p.rapidapi.com/GetNearestCities?latitude=${coords.lat}&longitude=${coords.lon}&range=0`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key":
              "a145af6a8amsh6e43aedc0781e7bp10205djsn224ac04321d6",
            "X-RapidAPI-Host": "geocodeapi.p.rapidapi.com",
          },
        }
      )
        .then((response) => response.json())
        .then((jsonData) => setCity(jsonData[0].City))
        .catch((e) => console.log(e));
    }
  }, [coords]);

  const replaceCity = (value) => {
    setLoading(true);
    value == city ? setLoading(false) : setCity(value);
  };

  const replaceCoords = (value) => {
    setLoading(true);
    value == coords ? setLoading(false) : setCoords(value);
  };

  const replaceLoading = (value) => {
    setLoading(value);
  };
  return (
    <DataContext.Provider
      value={{
        city,
        replaceCity,
        found,
        weather,
        loading,
        forecast,
        foundForecast,
        loadingForecast,
        replaceCoords,
        replaceLoading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
