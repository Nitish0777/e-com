import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import logo from "../../assets/img/logo.png";
import "../../styles/header.css";
import { useAuth } from "../../context/auth";

const Header = () => {
  const [auth, setAuth] = useAuth();
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
              <li className="nav-item">
                <NavLink
                  to="/"
                  className="button-link nav-item"
                  activeclassname="active"
                >
                  <span>Logout</span>
                </NavLink>
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
