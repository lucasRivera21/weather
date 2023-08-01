import React from "react";
import TemperatureBox from "./TemperatureBox";

function Temperatures({ magnitude, description, location, img, wind, max, min, feel, humidity }) {
  return (
    <article className="max-w-xl sticky h-80 min-w-300 bg-white px-6 py-4 rounded-3xl col-span-4 max-lg:mx-auto max-lg:mb-10 dark:bg-gray-900 transition ease-in-out duration-300">
      <figure className="absolute -z-10 right-12 max-sm:bottom-1/2 max-sm:translate-y-1/2 max-sm:right-5">
        <img src={img} alt="" className=" max-h-56 max-sm:max-h-40" />
      </figure>
      <h1 className="font-roboto text-4xl font-medium mb-1 max-sm:text-3xl dark:text-white transition ease-in-out duration-300 ">
        {magnitude}
        {wind ? " Km/h" : "°C"}
      </h1>
      <h2 className="font-roboto text-2xl font-normal mb-px max-sm:text-xl dark:text-white transition ease-in-out duration-300">{description}</h2>
      <h3 className="font-roboto text-xl font-light mt-px max-sm:text-lg max-sm:absolute max-sm:right-8 max-sm:top-6 dark:text-white transition ease-in-out duration-300">{location}</h3>

      {!wind && (
        <div className="flex justify-between absolute bottom-6  w-5/6 gap-3 left-1/2  max-sm:w-auto max-sm:-left-8 max-sm:translate-x-1/2  -translate-x-1/2 max-sm:block">
          <TemperatureBox
            bg={"bg-orange"}
            color={"text-white"}
            title={"MAX"}
            celcius={max + '°C'}
          />
          <TemperatureBox
            bg={"bg-green"}
            color={"text-black"}
            title={"Feels"}
            celcius={feel + '°C'}
          />
          <TemperatureBox
            bg={"bg-blue"}
            color={"text-white"}
            title={"MIN"}
            celcius={min + '°C'}
          />
        </div>
      )}

      {wind && (
        <div className="absolute  w-5/6 bottom-6 left-1/2 -translate-x-1/2">
          <h4 className="font-roboto text-xl font-normal max-sm:text-base dark:text-white transition ease-in-out duration-300">Humidity</h4>
          <div className="border-blue border-2 rounded-full mt-px dark:border-white transition ease-in-out duration-300">
            <div
              className="bg-blue font-semibold text-blue-100 text-center py-px  leading-none rounded-full text-white font-roboto text-lg max-sm:text-base max-sm:py-0 dark:bg-white dark:text-blue transition ease-in-out duration-300"
              style={{ width: `${humidity}%` }}
            >
              {" "}
              {humidity}%
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

export default Temperatures;
