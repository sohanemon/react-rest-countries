import { useContext, useState } from "react";
import { Combobox } from "@headlessui/react";
import { CountriesContext } from "../App";

function SearchBox() {
  const countries = useContext(CountriesContext);
  const [selected, setSelected] = useState(countries[0]);
  const [query, setQuery] = useState("");

  const filteredCountries =
    query === ""
      ? countries
      : countries.filter((country) => {
          return country.name.common
            .toLowerCase()
            .includes(query.toLowerCase());
        });

  return (
    <Combobox value={selected} onChange={setSelected}>
      <Combobox.Input onChange={(event) => setQuery(event.target.value)} />
      <Combobox.Options>
        {filteredCountries.map((country) => (
          <Combobox.Option key={country.cca2} value={country.name.common}>
            {country.name.common}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  );
}

export default SearchBox;
