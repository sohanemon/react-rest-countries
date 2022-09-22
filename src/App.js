import { createContext, useEffect, useState } from "react";
import Countries from "./components/countries";
import Modal from "./components/modal";
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

  const [isOpen, setIsOpen] = useState(false);
  return (
    <CountriesContext.Provider value={countries}>
      <SearchBox isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className='p-10'>
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
        <Countries />
      </div>
    </CountriesContext.Provider>
  );
}

export default App;
