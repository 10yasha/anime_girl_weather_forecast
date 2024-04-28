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
  const [filteredData, setFilteredData] = useState([]);
  return (
    <div className="search">
      <div className="searchInputs">
        <input type="text" placeholder={placeholder} />
        <div className="searchIcon">
          <SearchIcon />
        </div>
      </div>
      {filteredData.length != 0 && (
        <div className="searchResult">
          {data.map((value) => {
            return (
              <a className="searchItem" href="#">
                <p>{value.name}</p>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
