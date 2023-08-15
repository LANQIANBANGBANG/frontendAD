import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { USER_API_URL } from "../../config/config";

export const UserEdit = () => {
  const { userType, userId } = useParams();
  const [user, setUser] = useState({
    id: userId,
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    role: userType,
  });
  const token = sessionStorage.getItem("auth-token");
  //console.log("token on this page: ", token);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${USER_API_URL}/${userId}`);
        const userData = response.data.data.user;
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleUserInput = (event) => {
    const { name, value } = event.target;

    setUser({ ...user, [name]: value });
  };
  //console.log("user on this page: ", researcher);

  const updateUser = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${USER_API_URL}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        toast.success(`${userType} Updated Successfully!!!`, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setUser({
          id: userId,
          firstName: "",
          lastName: "",
          emailId: "",
          password: "",
          role: userType,
        });
      }
    } catch (error) {
      toast.error(`${userType} Update Failed. Please Try it Later!`, {
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
            <h5 className="card-title">
              Edit{" "}
              {userType.substring(0, 1).toUpperCase() +
                userType.toLowerCase().substring(1)}
            </h5>
          </div>
          <div className="card-body">
            <form className="row g-3" onSubmit={updateUser}>
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
                  value={user.firstName}
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
                  value={user.lastName}
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
                  value={user.emailId}
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
                  value={user.password}
                />
              </div>

              <div className="d-flex aligns-items-center justify-content-center">
                <input
                  type="submit"
                  className="btn bg-color custom-bg-text"
                  value={`Update ${
                    userType.substring(0, 1).toUpperCase() +
                    userType.toLowerCase().substring(1)
                  }`}
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
