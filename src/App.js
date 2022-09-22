import { createContext, useEffect, useState } from "react";
import Countries from "./components/countries";
import SearchBox from "./components/search-box";
import fetchData from "./utilities/fetch-data";
export const CountriesContext = createContext();
function App() {
  useEffect(() => {
    fetchData()
      .then((res) => res.json())
      .then((data) => setCountries(data));
  }, []);
  const [countries, setCountries] = useState([]);
  return (
    <CountriesContext.Provider value={countries}>
      <SearchBox />
      <div className='p-10'>
        <Countries />
      </div>
    </CountriesContext.Provider>
  );
}

export default App;
