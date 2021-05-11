import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

import Card from "../components/Card";
import ComicsCard from "../components/ComicsCard";
import Loader from "../components/Loader";

const MyCollection = ({ fav, handleRemoveFav }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = Cookies.get("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:3000/favorites", {
          fav,
        });
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [fav]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="container">
      {token ? (
        data.map((elem, index) => {
          return index === 0 ? (
            elem.length > 0 ? (
              <div key={index}>
                <p className="title">CHARACTERS</p>
                <div className="wrapMyCollection">
                  {elem.map((item, i) => {
                    return (
                      <Card
                        key={item._id}
                        data={item}
                        heart={false}
                        cross
                        handleRemoveFav={handleRemoveFav}
                      />
                    );
                  })}
                </div>
              </div>
            ) : (
              <p key={index} className="title">
                No favorite characters yet !
              </p>
            )
          ) : elem.length > 0 ? (
            <div key={index}>
              <p className="title">COMICS</p>
              <div className="wrapMyCollection">
                {elem.map((item, i) => {
                  return (
                    <ComicsCard
                      key={item._id}
                      data={item}
                      heart={false}
                      cross
                      handleRemoveFav={handleRemoveFav}
                    />
                  );
                })}
              </div>
            </div>
          ) : (
            <p key={index} className="title">
              No favorite comics yet !
            </p>
          );
        })
      ) : (
        <div>
          <Redirect to="/login" />
        </div>
      )}
    </div>
  );
};

export default MyCollection;
