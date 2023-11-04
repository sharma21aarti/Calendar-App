import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <div className="row">
      <div className="col-lg-12">
        <nav className="nav">
          <input type="checkbox" id="nav-check" />
          <div className="nav-header">
            <div className="nav-title">Logo</div>
          </div>
          <div className="nav-btn">
            <label>
              <span></span>
              <span></span>
              <span></span>
            </label>
          </div>

          <ul className="nav-list">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/chart">Chart</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
