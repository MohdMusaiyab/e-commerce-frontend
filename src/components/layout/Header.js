import React from "react";
import { FaShopify } from "react-icons/fa";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
const Header = () => {
  const [cart]=useCart();
  const categories = useCategory();
  const handelLogout = (e) => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
  };
  const [auth, setAuth] = useAuth();
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
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
            <Link to="/" className="navbar-brand d-flex align-items-center" href="#">
              <FaShopify></FaShopify>
              E-commerce App
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <SearchInput></SearchInput>
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
              </li>
              {/* //Yha se */}
              <li className="nav-item dropdown">
                <Link
                className="nav-link dropdown-toggle"
                  to={'/categories'}
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                <Link
                className="dropdown-item"
                  to={'/categories'}
                  role="button"
                 
                >
                  All Categories
                </Link>
                {categories?.map((c) => (
                    <li>
                      <Link className="dropdown-item" to={`/category/${c.slug}`}>
                        {c?.name}
                      </Link>
                    </li>
                ))}
                </ul>
              </li>
              {/* yha yk */}

              {!auth.user ? (
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
                  <div className="dropdown">
                      <button
                         className="btn btn-secondary nav-item dropdown-toggle nav-link"
                        type="button"
                        data-bs-toggle="dropdown"
                      >
                        {auth?.user?.name}
                      </button>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="dropdown-item"
                          exact={true}
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <NavLink
                        to="/login"
                        className="dropdown-item"
                        onClick={handelLogout}
                      >
                        Logout
                      </NavLink>
                    </ul>
                  </div>
                </>
              )}
              <li className="nav-item">
                <Badge count={cart?.length} showZero>
                <NavLink to="/cart" className="nav-link">
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
