import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import axios from "axios";
import Cookies from "js-cookie";

import Home from "./containers/Home";
import Header from "./components/Header";
import ComicsPerCharacter from "./containers/ComicsPerCharacter";
import Comics from "./containers/Comics";
import MyCollection from "./containers/MyCollection";
import SignUp from "./containers/SignUp";
import Login from "./containers/Login";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart, faTimes } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
library.add(faHeart, farHeart, faTimes);

function App() {
  const [searchChar, setSearchChar] = useState("");
  const [skipChar, setSkipChar] = useState(0);
  const [data, setData] = useState([]);
  const [token, setToken] = useState(Cookies.get("token") || null);
  let cookie = Cookies.get("fav");
  const [fav, setFav] = useState((cookie && JSON.parse(cookie)) || [[], []]);

  // LogIn and SignUp

  const setUser = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("token", token);
    } else {
      setToken(null);
      Cookies.remove("token");
    }
  };

  // Search

  const handleSearchChar = async (event, skip) => {
    event.preventDefault();
    const response = await axios.get(
      `http://localhost:3000/search-characters?name=${searchChar}&skip=${skip}`
    );
    setData(response.data);
  };

  // FAVORIS
  const handleAddFav = (id, from) => {
    let favCopy = [...fav];
    if (from === "char") {
      if (favCopy[0].indexOf(id) === -1) {
        favCopy[0].push(id);
        alert("Favoris ajouté !");
      } else {
        alert("Déjà en favoris !");
      }
    } else if (favCopy[1].indexOf(id) === -1) {
      favCopy[1].push(id);
      alert("Favoris ajouté !");
    } else {
      alert("Déjà en favoris !");
    }

    setFav(favCopy);
    Cookies.set("fav", JSON.stringify(favCopy));
  };

  const handleRemoveFav = (id) => {
    const fav = Cookies.get("fav");
    const tabFav = fav && JSON.parse(fav);

    let newFav = [[], []];
    for (let i = 0; i < tabFav.length; i++) {
      for (let j = 0; j < tabFav[i].length; j++) {
        if (i === 0) {
          if (tabFav[i][j] !== id) {
            newFav[0].push(tabFav[i][j]);
          }
        } else {
          if (tabFav[i][j] !== id) {
            newFav[1].push(tabFav[i][j]);
          }
        }
      }
    }
    setFav(newFav);
    Cookies.set("fav", JSON.stringify(newFav));
  };
  return (
    <Router>
      <div>
        <Header
          setData={setData}
          setToken={setToken}
          token={token}
          search={searchChar}
          setSearch={setSearchChar}
          handleSearchChar={handleSearchChar}
        />
        <Switch>
          <Route exact path="/">
            <Home
              searchData={data}
              search={searchChar}
              setSearch={setSearchChar}
              handleAddFav={handleAddFav}
              setSkipChar={setSkipChar}
              skipChar={skipChar}
            />
          </Route>
          <Route path="/comics/:characterId">
            <ComicsPerCharacter
              searchData={data}
              handleAddFav={handleAddFav}
              setSkipChar={setSkipChar}
              skipChar={skipChar}
            />
          </Route>
          <Route path="/comics">
            <Comics />
          </Route>
          <Route path="/myCollection">
            <MyCollection handleRemoveFav={handleRemoveFav} fav={fav} />
          </Route>

          <Route path="/login">
            <Login setUser={setUser} />
          </Route>
          <Route path="/signup">
            <SignUp setUser={setUser} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
