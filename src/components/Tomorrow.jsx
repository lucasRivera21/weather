import React from "react";



function Tomorrow({ img, temp, weather }) {

  return (
    <article className="rounded-2xl bg-white col-span-2 relative p-5 overflow-hidden max-w-xs max-h-80 max-lg:mx-auto dark:bg-gray-900 transition ease-in-out duration-300">
      <h1 className="font-roboto text-2xl font-normal max-sm:text-xl dark:text-white transition ease-in-out duration-300">Tomorrow</h1>
      <div className="absolute bottom-5">
        <strong className="font-roboto text-3xl font-medium max-sm:text-2xl dark:text-white transition ease-in-out duration-300">{temp}°C</strong>
        <p className="font-roboto text-lg font-normal max-sm:text-lg dark:text-white transition ease-in-out duration-300">{weather}</p>
      </div>
      <img src={img} alt={weather} className="-z-10 max-sm:w-80" />
    </article>
  );
}

export default Tomorrow;
