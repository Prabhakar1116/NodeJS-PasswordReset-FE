// importing components
import React from 'react';
import { NavLink } from 'react-router-dom'; 

const Navbar = ({ value }) => {
    // Page structure and design
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container px-4 px-lg-5">
          <NavLink className="navbar-brand" to="/">Funko Pop's</NavLink> 
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
              <li className="nav-item"><NavLink className="nav-link" activeClassName="active" exact to="/">Home</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" activeClassName="active" to="/category">Category</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" activeClassName="active" to="/about">About</NavLink></li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Shop</a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><NavLink className="dropdown-item" to="/products">All Products</NavLink></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><NavLink className="dropdown-item" to="/popular">Popular Items</NavLink></li>
                  <li><NavLink className="dropdown-item" to="/featured">Featured</NavLink></li>
                </ul>
              </li>
            </ul>
            <div className="d-flex align-items-center"> 
              <form className="d-flex">
                <button className="btn btn-outline-dark" type="submit">
                  <i className="bi-cart-fill me-1"></i>
                  Cart
                  <span className="badge bg-dark text-white ms-1 rounded-pill">{value}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
