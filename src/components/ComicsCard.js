import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ComicCard = ({ data, handleAddFav, heart, cross, handleRemoveFav }) => {
  const url = data.thumbnail.path + "." + data.thumbnail.extension;

  return (
    <div style={{ position: "relative" }}>
      {heart ? (
        <div onClick={() => handleAddFav(data._id)} className="heart-icon">
          <FontAwesomeIcon icon={["far", "heart"]} />
        </div>
      ) : cross ? (
        <div onClick={() => handleRemoveFav(data._id)} className="heart-icon">
          {" "}
          <FontAwesomeIcon icon="times" />
        </div>
      ) : null}
      <div className="cardsChar">
        <img alt="comics" src={url} />
        <div>
          <span>{data.title}</span>
        </div>
      </div>
    </div>
  );
};

export default ComicCard;
