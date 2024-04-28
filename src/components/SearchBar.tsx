import React, { useState } from "react";
import { city } from "../interfaces/Interfaces";
import "./SearchBar.css";

import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar({
  placeholder,
  data,
}: {
  placeholder: string;
  data: city[];
}) {
  const [filteredCities, setFilteredCities] = useState<city[]>([]);

  const handleCitySearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    let search = e.target.value.toLowerCase();

    let updatedCities = data.filter((val) => {
      return val.name.toLowerCase().includes(search);
    });

    if (updatedCities.length > 10) updatedCities.slice(0, 10);
    setFilteredCities(updatedCities);
  };
  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          onChange={handleCitySearch}
        />
        <div className="searchIcon">
          <SearchIcon />
        </div>
      </div>
      {filteredCities.length != 0 && (
        <div className="searchResult">
          {filteredCities.map((val) => {
            return (
              <a className="searchItem" href="#">
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
