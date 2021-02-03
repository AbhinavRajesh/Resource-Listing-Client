import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

import "./index.css";

const Navbar = ({ setSearch, handleSearch }) => {
  const { user } = useContext(AuthContext);

  const handleChange = (e) => setSearch(e.target.value);
  return (
    <div className="navbar__container">
      <div className="navbar__logo">
        <Link to="/">
          <h1>Aspire</h1>
        </Link>
      </div>
      {window.location.pathname === "/" && (
        <form className="navbar__search" onSubmit={handleSearch}>
          <input
            type="text"
            onChange={handleChange}
            placeholder="Search tags"
          />
          <i type="submit" className="fas fa-search" onClick={handleSearch}></i>
        </form>
      )}
      <div className="navbar__links">
        <ul>
          <Link to="/">
            <li>Home</li>
          </Link>
          {window.innerWidth <= 1024 && (
            <Link to="/addPost">
              <li>Add Post</li>
            </Link>
          )}
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
