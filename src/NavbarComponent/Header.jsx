import { Link } from "react-router-dom";
import logo from "../images/h_logo.png";
import { RoleNav } from "./RoleNav";
import { useState, useEffect } from "react";

const Header = () => {
  const doctor = JSON.parse(sessionStorage.getItem("active-doctor"));
  const admin = JSON.parse(sessionStorage.getItem("active-admin"));
  const researcher = JSON.parse(sessionStorage.getItem("active-researcher"));
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    if (doctor !== null) {
      setGreeting("Welcome to Doctor Page");
    } else if (admin !== null) {
      setGreeting("Welcome to Admin Page");
    } else if (researcher !== null) {
      setGreeting("Welcome to Researcher Page");
    } else {
      setGreeting("Welcome!");
    }
  }, [doctor, admin, researcher]);

  return (
    <div>
      <nav className="navbar  navbar-expand-lg custom-bg text-color">
        <div className="container-fluid text-color">
          <Link to="/" className="nacbar-brand">
            <img
              src={logo}
              width="220"
              height="40"
              className="d-inline-block align-top"
              alt=""
            />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mt-3">
              <li className="nav-item">
                {/* <Link
                  to="/about"
                  className="nav-link active"
                  aria-current="page"
                >
                  <b className="text-color">Contact US</b>
                </Link> */}
                <b>{greeting}</b>
              </li>
            </ul>
            <RoleNav />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
