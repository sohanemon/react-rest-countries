import { Fragment, useContext, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
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
    <div className='fixed top-16 w-72'>
      <Combobox value={selected} onChange={setSelected}>
        <div className='relative mt-1'>
          <div className='relative w-full overflow-hidden text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm'>
            <Combobox.Input
              className='w-full py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 border-none focus:ring-0'
<<<<<<< HEAD
              displayValue={(country) => country?.name?.common || "search"}
=======
>>>>>>> parent of 61d7af8 (country name added)
              onChange={(event) => setQuery(event.target.value)}
            />{" "}
            <Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-2'>
              <ChevronUpDownIcon
                className='w-5 h-5 text-gray-400'
                aria-hidden='true'
              />
            </Combobox.Button>
            {/* <Combobox.Options>
              {filteredCountries.map((country) => (
                <Combobox.Option key={country.cca2} value={country.name.common}>
                  {country.name.common}
                </Combobox.Option>
              ))}
            </Combobox.Options> */}
          </div>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className='absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
              {filteredCountries.length === 0 && query !== "" ? (
                <div className='relative px-4 py-2 text-gray-700 cursor-default select-none'>
                  Nothing found.
                </div>
              ) : (
                filteredCountries.map((country) => (
                  <Combobox.Option
                    key={country.cca2}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-gray-200 text-teal-800" : "text-gray-900"
                      }`
                    }
                    value={country}
                  >
                    {({ selected, active }) => (
                      <div className='flex gap-3'>
                        <img
                          className='w-10 h-min'
                          src={country.flags.svg}
                          alt={country.name.common + "flag"}
                        />
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {country.name.common}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-teal-600"
                            }`}
                          >
                            <CheckIcon className='w-5 h-5' aria-hidden='true' />
                          </span>
                        ) : null}
                      </div>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}

export default SearchBox;
