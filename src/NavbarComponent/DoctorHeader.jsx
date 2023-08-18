import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const DoctorHeader = () => {
  let navigate = useNavigate();

  //const user = JSON.parse(sessionStorage.getItem("active-doctor"));

  const doctorLogout = () => {
    toast.success("logged out!!!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    sessionStorage.removeItem("active-doctor");
    sessionStorage.removeItem("auth-token");
    navigate("/");
    navigate(0);
  };

  return (
    <ul class="navbar-nav ms-auto mt-3 me-5">
      <li className="nav-item">
        <Link to="record/all" className="nav-link active" aria-current="page">
          <b className="text-color">View Medical Record</b>
        </Link>
      </li>

      <li class="nav-item">
        <Link
          to=""
          class="nav-link active"
          aria-current="page"
          onClick={doctorLogout}
        >
          <b className="text-color">Logout</b>
        </Link>
        <ToastContainer />
      </li>
    </ul>
  );
};
