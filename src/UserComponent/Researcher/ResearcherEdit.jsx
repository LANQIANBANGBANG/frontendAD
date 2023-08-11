import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { USER_API_URL } from "../../config/config";

export const ResearcherEdit = () => {
  const { id: researcherId } = useParams();
  const [researcher, setResearcher] = useState({
    id: researcherId,
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    role: "RESEARCHER",
  });
  const token = sessionStorage.getItem("auth-token");
  //console.log("token on this page: ", token);

  useEffect(() => {
    const fetchResearcherData = async () => {
      try {
        const response = await axios.get(`${USER_API_URL}/${researcherId}`);
        const researcherData = response.data.data.user;
        setResearcher(researcherData);
      } catch (error) {
        console.error("Error fetching researcher data:", error);
      }
    };

    fetchResearcherData();
  }, [researcherId]);

  const handleUserInput = (event) => {
    const { name, value } = event.target;

    setResearcher({ ...researcher, [name]: value });
  };

  const updateResearcher = async (event) => {
    event.preventDefault();

    try {
      const response = fetch(`${USER_API_URL}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      window.location.reload(true);

      if (response.data.success) {
        toast.success("Researcher Updated Successfully!!!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setResearcher({
          id: researcherId,
          firstName: "",
          lastName: "",
          emailId: "",
          password: "",
          role: "DOCTOR",
        });
      }
    } catch (error) {
      toast.error("Update Failed. Please Try Again!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div>
      <div className="mt-2 d-flex aligns-items-center justify-content-center ms-2 me-2 mb-2">
        <div
          className="card form-card border-color text-color custom-bg"
          style={{ width: "50rem" }}
        >
          <div className="card-header bg-color custom-bg-text text-center">
            <h5 className="card-title">Edit Researcher</h5>
          </div>
          <div className="card-body">
            <form className="row g-3" onSubmit={updateResearcher}>
              <div className="col-md-6 mb-3 text-color">
                <label htmlFor="title" className="form-label">
                  <b> First Name</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  onChange={handleUserInput}
                  value={researcher.firstName}
                />
              </div>
              <div className="col-md-6 mb-3 text-color">
                <label htmlFor="description" className="form-label">
                  <b>Last Name</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  onChange={handleUserInput}
                  value={researcher.lastName}
                />
              </div>

              <div className="col-md-6 mb-3 text-color">
                <b>
                  <label className="form-label">Email Id</label>
                </b>
                <input
                  type="email"
                  className="form-control"
                  id="emailId"
                  name="emailId"
                  onChange={handleUserInput}
                  value={researcher.emailId}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="quantity" className="form-label">
                  <b>Password</b>
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  onChange={handleUserInput}
                  value={researcher.password}
                />
              </div>

              <div className="d-flex aligns-items-center justify-content-center">
                <input
                  type="submit"
                  className="btn bg-color custom-bg-text"
                  value="Update Researcher"
                />
              </div>

              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
