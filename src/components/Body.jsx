import React, { useContext } from "react";
import Temperatures from "./Temperatures";
import Graphic from "./Graphic";
import Tomorrow from "./Tomorrow";
import img from "../data/img";
import { DataContext } from "../context/DataContext";
import { Circles } from "react-loader-spinner";

function Body() {
  const { weather, found, loading, forecast, foundForecast, loadingForecast } =
    useContext(DataContext);

  const imgSort = (weather) => {
    return weather.includes("rain") ||
      weather.includes("shower") ||
      weather.includes("thunderstorm")
      ? img.rain
      : weather.includes("sun") || weather.includes("clear")
      ? img.sunny
      : weather.includes("broken")
      ? img.clear
      : weather.includes("snow")
      ? img.snow
      : weather.includes("cloud") || weather.includes("overcast")
      ? img.cloud
      : img.notFound;
  };

  return (
    <>
      {loading && (
        <div className="flex w-full h-screen justify-center items-center">
          <Circles
            height="160"
            width="160"
            color="#F97F29"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      )}

      {found && !loading && foundForecast && !loadingForecast && (
        <main className=" grid-cols-8 grid gap-20 max-w-7xl mx-auto sm:mt-20 mt-8 px-4 py-4 max-lg:block ">
          <Temperatures
            magnitude={Math.round(weather.main.temp)}
            description={weather.weather[0].description}
            location={weather.name}
            img={imgSort(weather.weather[0].description)}
            wind={false}
            max={Math.round(weather.main.temp_max)}
            min={Math.round(weather.main.temp_min)}
            feel={Math.round(weather.main.feels_like)}
          />
          <Temperatures
            magnitude={weather.wind.speed}
            description="Wind Speed"
            location={weather.wind.deg + "°"}
            img={img.wind}
            wind={true}
            humidity={weather.main.humidity}
          />
          <Graphic />
          <Tomorrow
            img={imgSort(forecast.list[4].weather[0].description)}
            temp={Math.round(forecast.list[4].main.temp)}
            weather={forecast.list[4].weather[0].description}
          />
        </main>
      )}
      {!found && !loading && !foundForecast && !loadingForecast && (
        <div className="h-screen  bg-back dark:bg-slate-800 w-full pt-14 transition ease-in-out duration-300">
          <h1 className="dark:text-white font-roboto font-semibold text-center text-2xl mb-10 transition ease-in-out duration-300">NOT FOUND</h1>
          <figure className="max-w-md mx-auto">
            <img src={img.notFound} alt="Not Found" />
          </figure>
        </div>
      )}
    </>
  );
}

export default Body;
