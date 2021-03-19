import React, { useState } from "react";
import DisplayOne from "./DisplayOne";
import DisplayOneDetail from "./DisplayOneDetail";

const Display = ({ countries, filter }) => {
  const [showCountry, setShowCountry] = useState();

  const show = (event) => {
    // console.log(event.target.value);
    const cont = countries.filter((country) =>
      country.name.includes(event.target.value)
    );
    // console.log("cont:", cont);
    console.log(cont[0]);
    setShowCountry(cont[0]);
    console.log(showCountry);
  };

  const countriesToShow = countries.filter((countries) =>
    countries.name.toLowerCase().includes(filter.toLowerCase())
  );

  if (countriesToShow.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  if (showCountry !== undefined) {
    return <DisplayOneDetail country={showCountry} />;
  }

  if (countriesToShow.length > 1) {
    return (
      <ul>
        {countriesToShow
          .filter((country) =>
            country.name.toLowerCase().includes(filter.toLowerCase())
          )
          .map((country) => (
            <DisplayOne key={country.name} country={country} show={show} />
          ))}
      </ul>
    );
  }
  return (
    <ul>
      {countriesToShow.map((country) => (
        <DisplayOneDetail country={country} />
      ))}
    </ul>
  );
};

export default Display;
