import { Link, useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import SearchComics from "./SearchComics";
import logo from "../assets/img/logo.png";

const Header = ({ token, setToken, search, setSearch, handleSearchChar }) => {
  const history = useHistory();
  return (
    <header className="container">
      <div className="diplayheader">
        <div className="logo">
          <Link to="/" className="logoLink">
            <img src={logo} alt="logo marvel" />
          </Link>
        </div>
        <SearchComics
          search={search}
          setSearch={setSearch}
          handleSearchChar={handleSearchChar}
        />
        <div className="diplayLeftButton">
          <Link to="/myCollection" className="linkto">
            My Collection
          </Link>

          {token ? (
            <span
              onClick={() => {
                setToken(null);
                Cookies.remove("token");
                history.push("/");
              }}
              className="buttonLogout"
            >
              Logout
            </span>
          ) : (
            <div className="displayButton">
              <div>
                <Link to="/login" className="linkto">
                  Login
                </Link>
              </div>
              <div>
                <Link to="/signup" className="linkto">
                  Sign Up
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
