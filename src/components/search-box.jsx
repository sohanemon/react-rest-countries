import { Fragment, useContext, useRef, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

import { CountriesContext } from "../App";

function SearchBox({ isOpen, setIsOpen, setCountry }) {
  const countries = useContext(CountriesContext);
  const [selected, setSelected] = useState(countries[0]);
  const [query, setQuery] = useState("");
  const input = useRef(null);
  const filteredCountries =
    query === ""
      ? countries
      : countries.filter((country) => {
          return country.name.common
            .toLowerCase()
            .includes(query.toLowerCase());
        });
  const showModal = () => {
    setSelected();
    setTimeout(() => {
      setCountry(input.current.value);
    }, 100);
    //note: state is asynchronous. so we need to wait until the render is complete
    setIsOpen(true);
  };

  return (
    <div className='sticky mx-auto top-16 w-72'>
      <Combobox value={selected} onChange={showModal}>
        <div className='relative mt-1'>
          <div className='relative w-full overflow-hidden text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm'>
            <Combobox.Input
              ref={input}
              className='w-full py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 border-none outline-none focus:ring-0'
              displayValue={(country) => country?.name?.common || "search"}
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
                        active ? "bg-teal-600 text-white" : "text-gray-900"
                      }`
                    }
                    value={country}
                  >
                    {({ selected, active }) => (
                      <div className='flex gap-3'>
                        <img
                          src={country?.flags?.svg}
                          alt='flag'
                          className='w-10'
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
