import { Link } from "react-router-dom";

const NormalHeader = () => {
  return (
    <ul className="navbar-nav ms-auto me-5 mt-3">
      <li className="nav-item">
        <Link to="/user/login" className="nav-link active" aria-current="page">
          <b className="text-color">Login</b>
        </Link>
      </li>
    </ul>
  );
};

export default NormalHeader;
