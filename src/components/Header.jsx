import React, { useState, useContext } from "react";
import { HiLocationMarker } from "react-icons/hi";
import { FaSearch } from "react-icons/fa";
import { WiMoonAltFirstQuarter } from "react-icons/wi";
import { DataContext } from "../context/DataContext";

if (
  localStorage.theme === "dark" ||
  (!("theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

function Header() {
  const [city, setCity] = useState("");
  const { replaceCity, replaceCoords, replaceLoading } =
    useContext(DataContext);



  const handleUbication = () => {
    replaceLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        replaceCoords({ lat, lon });
      });
    } else {
      alert("cannot find the location");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    replaceCity(city);
    setCity("");
  };
  return (
    <header className="flex justify-between pt-12 max-w-6xl mx-auto px-8 max-sm:grid max-sm:grid-cols-2 max-sm:max-w-xs max-sm:px-4">
      {/*"Find me" button*/}
      <button
        className="bg-orange flex text-lg text-white w-28 h-9 justify-center rounded-lg shadow-lg items-center max-sm:ml-6"
        onClick={handleUbication}
      >
        <HiLocationMarker className="text-2xl" />
        <p className="text-lg font-roboto font-medium ml-2">Find me</p>
      </button>

      {/*search form*/}
      <form
        action="POST"
        className="flex justify-center max-sm:col-span-2 max-sm:order-first h-9  mb-6 "
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="h-full rounded-lg w-72 placeholder:font-roboto pl-3 peer focus:rounded-r-none focus:outline-none"
          placeholder="Search ..."
          name="search"
          onChange={(e) => setCity(e.target.value)}
          value={city}
        />

        <button className="bg-orange h-full text-white rounded-r-lg flex justify-center items-center shadow-lg w-0 peer-focus:w-10 transition-all ease-out duration-300">
          <FaSearch className=" text-xl" />
        </button>
      </form>

      {/*dark mode button*/}
      <button
        className="bg-orange text-white w-10 h-9 flex justify-center items-center text-2xl rounded-lg shadow-md max-sm:ml-10"
        onClick={() => document.documentElement.classList.toggle("dark")}
      >
        <WiMoonAltFirstQuarter />
      </button>
    </header>
  );
}

export default Header;
