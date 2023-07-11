import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import logo from "../../assets/img/logo.png";
import "../../styles/header.css";
import { useAuth } from "../../context/auth";
import { toast } from "react-hot-toast";
import Searchinput from "../Form/Searchinput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";

const Header = () => {
  const [cart] = useCart();
  const [auth, setAuth] = useAuth();
  const categories = useCategory();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout successfull");
  };
  // return (
  //   <header className="header">
  //     <nav className="navbar">
  //       <div className="logo-container">
  //         <Link to="/" className="logo-link">
  //           <img src={logo} alt="Logo" className="logo" />
  //         </Link>
  //       </div>
  //       <Searchinput />
  //       <ul className="nav-list">
  //         {!auth.user ? (
  //           <>
  //             <li className="nav-item">
  //               <NavLink to="/register" className="nav-link">
  //                 <span className="button-link nav-item">Sign Up</span>
  //               </NavLink>
  //             </li>
  //             <li className="nav-item">
  //               <NavLink to="/login" className="nav-link">
  //                 <span className="button-link nav-item">Login</span>
  //               </NavLink>
  //             </li>
  //           </>
  //         ) : (
  //           <>
  //             <li className="nav-item dropdown">
  //               <NavLink
  //                 className="nav-link dropdown-toggle"
  //                 href="#"
  //                 role="button"
  //                 data-bs-toggle="dropdown"
  //                 aria-expanded="false"
  //               >
  //                 {auth?.user?.name}
  //               </NavLink>
  //               <ul className="dropdown-menu">
  //                 <li>
  //                   <NavLink
  //                     to={`/dashboard/${
  //                       auth?.user?.role === 1 ? "admin" : "user"
  //                     }`}
  //                     className="dropdown-item"
  //                   >
  //                     Dashboard
  //                   </NavLink>
  //                 </li>
  //                 <li>
  //                   <NavLink
  //                     onClick={handleLogout}
  //                     to="/login"
  //                     className="dropdown-item"
  //                     activeclassname="active"
  //                   >
  //                     <span>Logout</span>
  //                   </NavLink>
  //                 </li>
  //               </ul>
  //             </li>
  //           </>
  //         )}
  //         <li className="nav-item">
  //           <NavLink to="/" className="nav-link" activeclassname="active">
  //             <span className="bold-text">Home</span>
  //           </NavLink>
  //         </li>

  //         <li className="nav-item dropdown">
  //           <Link
  //             to="/categories"
  //             className="nav-link dropdown-toggle"
  //             data-bs-toggle="dropdown"
  //           >
  //             Category
  //           </Link>
  //           <ul className="dropdown-menu">
  //             <li>
  //               <Link className="dropdown-item" to="/categories">
  //                 All Categories
  //               </Link>
  //             </li>
  //             {categories?.map((c) => (
  //               <li key={c.id}>
  //                 <Link className="dropdown-item" to={`/category/${c.slug}`}>
  //                   {c.name}
  //                 </Link>
  //               </li>
  //             ))}
  //           </ul>
  //         </li>

  //         <li className="nav-item">
  //           <Badge count={cart.length}>
  //             <NavLink to="/cart" className="nav-link" activeclassname="active">
  //               <FaShoppingCart className="icons" />
  //             </NavLink>
  //           </Badge>
  //         </li>
  //       </ul>
  //     </nav>
  //   </header>
  // );
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand">
              🛒 Ecommerce App
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <Searchinput />
              <li className="nav-item">
                <NavLink
                  to="/"
                  className="nav-link "
                  style={{ color: "black" }}
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                  style={{ color: "black" }}
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={"/categories"}>
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {!auth?.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      Login
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
                      style={{ border: "none" }}
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
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              <li className="nav-item">
                <Badge count={cart?.length} showZero>
                  <NavLink
                    to="/cart"
                    className="nav-link"
                    style={{ color: "black" }}
                  >
                    Cart
                  </NavLink>
                </Badge>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
