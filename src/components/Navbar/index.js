import axios from "axios";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

import "./index.css";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const { user } = useContext(AuthContext);

  const [searchResults, setSearchResults] = useState({});
  const handleSearch = async () => {
    // TODO: Need to implement the route /api/v1/search/:query
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/search/${search}`
    );
    if (data.results) setSearchResults(data.results);
    else if (data.error) alert(data.error);
  };

  const handleChange = (e) => setSearch(e.target.value);

  return (
    <div className="navbar__container">
      <div className="navbar__logo">
        <h1>Aspire</h1>
      </div>
      <div className="navbar__search">
        <input type="text" onChange={handleChange} placeholder="Search tags" />
        <i className="fas fa-search" onClick={handleSearch}></i>
      </div>
      <div className="navbar__links">
        <ul>
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/profile">
            <img src={user?.image} alt="" />
            <li>{user?.displayName}</li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
