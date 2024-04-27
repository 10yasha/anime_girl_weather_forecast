import React from "react";
import { city } from "../interfaces/Interfaces";

export default function SearchBar({
  placeholder,
  data,
}: {
  placeholder: string;
  data: city[];
}) {
  return (
    <div className="search">
      <div className="searchInputs"></div>
      <input type="text" placeholder={placeholder} />
      <div className="searchIcon"> </div>
      <div className="searchResult"></div>
    </div>
  );
}
