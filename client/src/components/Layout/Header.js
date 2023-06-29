import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import logo from "../../assets/img/logo.png";
import "../../styles/header.css";
import { useAuth } from "../../context/auth";
import { toast } from "react-hot-toast";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout successfull");
  };
  return (
    <header className="header">
      <nav className="navbar">
        <div className="logo-container">
          <Link to="/" className="logo-link">
            <img src={logo} alt="Logo" className="logo" />
          </Link>
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search" />
          <button type="submit">
            <FaSearch />
          </button>
        </div>
        <ul className="nav-list">
          {!auth.user ? (
            <>
              <li className="nav-item">
                <NavLink to="/register" className="nav-link">
                  <span className="button-link nav-item">Sign Up</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/login" className="nav-link">
                  <span className="button-link nav-item">Login</span>
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {auth?.user?.name}
                </NavLink>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink
                      to={`/dashboard/${
                        auth?.user?.role === 1 ? "admin" : "user"
                      }`}
                      className="dropdown-item"
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={handleLogout}
                      to="/login"
                      className="dropdown-item"
                      activeclassname="active"
                    >
                      <span>Logout</span>
                    </NavLink>
                  </li>
                </ul>
              </li>
            </>
          )}
          <li className="nav-item">
            <NavLink to="/" className="nav-link" activeclassname="active">
              <span className="bold-text">Home</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/category"
              className="nav-link"
              activeclassname="active"
            >
              <span className="bold-text">Category</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/cart" className="nav-link" activeclassname="active">
              <FaShoppingCart className="icons" />
              <span className="bold-text">Cart (0)</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
