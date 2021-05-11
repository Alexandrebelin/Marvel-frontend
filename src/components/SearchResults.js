import React from "react";
import Card from "./Card";

const SearchResultsCard = ({ data, category }) => {
  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {data.results.map((item, index) => {
        return <Card key={index} data={item} />;
      })}
    </div>
  );
};

export default SearchResultsCard;
