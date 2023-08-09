import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export const ResearcherHeader = () => {
  let navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("active-researcher"));

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
    sessionStorage.removeItem("active-researcher");
    window.location.reload(true);
    navigate("/");
  };

  return (
    <ul class="navbar-nav ms-auto mb-2 mb-lg-0 me-5">
      <li className="nav-item">
        <Link to="record/all" className="nav-link active" aria-current="page">
          <b className="text-color">DataSet Dashboard</b>
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/report/all" className="nav-link active" aria-current="page">
          <b className="text-color">Released Reports</b>
        </Link>
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
