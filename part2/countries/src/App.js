import axios from "axios";
import { useEffect, useState } from "react";
import Display from "./Display";
import Filter from "./Filter";

function App() {
  const [countries, setCountries] = useState([])
  const [toShow, setToShow] = useState('')

  useEffect(
    () => {
      axios.get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
    }
  ,[])
  // console.log(countries);

  const handleSearchChange = (event) => {
    setToShow(event.target.value)
  };

  return (
    <div>
      <Filter value={toShow} onChange={handleSearchChange} />
      <Display countries={countries} filter={toShow} />
    </div>
  );
}

export default App;
