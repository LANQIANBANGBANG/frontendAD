import React from "react";
import { Link } from "react-router-dom";

export const UserLink = ({ to, label }) => {
  return (
    <li className="nav-item">
      <Link to={to} className="nav-link active" aria-current="page">
        <b className="text-color">{label}</b>
      </Link>
    </li>
  );
};
