import { useContext } from "react";
import { CountriesContext } from "../App";

const Countries = () => {
  const countries = useContext(CountriesContext);
  return (
    <div className=''>
      <h1>{countries.length} countries found</h1>
      <br />
      <div className='grid justify-center grid-cols-5 gap-4 '>
        {countries.map((country) => (
          <Country key={country.cca2} {...country} />
        ))}
      </div>
    </div>
  );
};

export default Countries;

function Country({ area, name, population, flags }) {
  return (
    <div className='p-4 px-10 text-center text-gray-200 rounded-md shadow-lg bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-600'>
      <img
        src={flags.svg}
        alt={name.common + "flag"}
        className='w-1/2 mx-auto'
      />
      <p className='text-xl font-semibold text-white '>{name.common}</p>
      <p>Population: {population}</p>
      <p>Area: {area}</p>
    </div>
  );
}
