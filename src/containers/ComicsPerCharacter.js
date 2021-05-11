import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import ComicCard from "../components/ComicsCard";

const ComicsPerCharacter = ({ handleAddFav, setSkipChar, skipChar }) => {
  const [data, setData] = useState([]);
  const params = useParams();
  const id = params.characterId;

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:3000/comics/${id}`);
      setData(response.data.comics);
      console.log(response.data);
    };
    fetchData();
  }, [id]);

  return (
    <div className="container">
      <div className="wrapMyCollection">
        {data &&
          data.map((elem, index) => {
            return (
              <ComicCard
                handleAddFav={handleAddFav}
                key={index}
                index={index}
                data={elem}
                heart
              />
            );
          })}
      </div>
    </div>
  );
};

export default ComicsPerCharacter;
