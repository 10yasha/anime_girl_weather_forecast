import React, { useState } from "react";
import { city } from "../interfaces/Interfaces";
import "./SearchBar.css";

import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

export default function SearchBar({
  placeholder,
  allCities,
  callback,
}: {
  placeholder: string;
  allCities: city[];
  callback: (data: city) => void;
}) {
  const [filteredCities, setFilteredCities] = useState<city[]>([]);
  const [searchEntered, setSearchEntered] = useState<string>("");

  const handleCitySearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    let search = e.target.value.toLowerCase();
    setSearchEntered(search);
    if (search === "") {
      setFilteredCities([]);
      return;
    }

    let count = 0;
    let updatedCities = allCities.filter((val) => {
      let normalizedName = val.name
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      if (count < 20 && normalizedName.toLowerCase().includes(search)) {
        count++;
        return true;
      }
      return false;
    });

    setFilteredCities(updatedCities);
  };

  const clearInput = () => {
    setFilteredCities([]);
    setSearchEntered("");
  };

  const handleClick = (data: city) => {
    callback(data);
    clearInput();
  };

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={searchEntered}
          onChange={handleCitySearch}
        />
        <div className="searchIcon">
          {searchEntered.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      {filteredCities.length != 0 && (
        <div className="searchResult">
          {filteredCities.map((val) => {
            return (
              <a
                className="searchItem"
                href="#"
                onClick={() => {
                  handleClick(val);
                }}
              >
                <p>
                  {val.name} {val.stateCode} {val.countryCode}
                </p>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
