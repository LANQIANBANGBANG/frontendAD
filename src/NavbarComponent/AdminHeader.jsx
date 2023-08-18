import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserLink } from "./UserLink";

const AdminHeader = () => {
  let navigate = useNavigate();

  //const user = JSON.parse(sessionStorage.getItem("active-admin"));

  const adminLogout = () => {
    toast.success("logged out!!!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    navigate("/");
    sessionStorage.removeItem("active-admin");
    sessionStorage.removeItem("auth-token");
    navigate(0);
  };

  return (
    <ul class="navbar-nav ms-auto mt-3 me-5">
      <li className="nav-item">
        <Link
          to="user/doctor/all"
          className="nav-link active"
          aria-current="page"
        >
          <b className="text-color">View Doctors</b>
        </Link>
      </li>
      <UserLink to="/user/nurse/all" label="View Nurses" />
      <UserLink to="/user/researcher/all" label="View Researchers" />

      <li class="nav-item">
        <Link
          to=""
          class="nav-link active"
          aria-current="page"
          onClick={adminLogout}
        >
          <b className="text-color">Logout</b>
        </Link>
        <ToastContainer />
      </li>
    </ul>
  );
};

export default AdminHeader;
