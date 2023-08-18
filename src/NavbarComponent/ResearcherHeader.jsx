import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export const ResearcherHeader = () => {
  let navigate = useNavigate();

  //const user = JSON.parse(sessionStorage.getItem("active-researcher"));

  const ResearcherLogout = () => {
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
    sessionStorage.removeItem("active-researcher");
    sessionStorage.removeItem("auth-token");
    navigate(0);
  };

  return (
    <ul class="navbar-nav ms-auto mt-3 me-5">
      <li className="nav-item">
        <a
          href="http://13.250.206.7:3000/home"
          className="nav-link active"
          aria-current="page"
        >
          <b className="text-color">Researcher Dashboard</b>
        </a>
      </li>

      <li class="nav-item">
        <Link to="" class="nav-link active" aria-current="page">
          <b className="text-color" onClick={ResearcherLogout}>
            Logout
          </b>
        </Link>
        <ToastContainer />
      </li>
    </ul>
  );
};
