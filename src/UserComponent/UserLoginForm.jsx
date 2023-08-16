import React from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { LOGIN_API_URL } from "../config/config";

const UserLoginForm = () => {
  let navigate = useNavigate();

  const [loginRequest, setLoginRequest] = useState({
    emailId: "",
    password: "",
    role: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [showCredentials, setShowCredentials] = useState(false);

  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setLoginRequest({ ...loginRequest, [name]: value });
  };
  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    setLoginRequest((prevRequest) => ({
      ...prevRequest,
      role: selectedRole,
    }));
    setShowCredentials(selectedRole !== "0");
  };
  //console.log("log in request: ", loginRequest);

  const loginAction = async (e) => {
    e.preventDefault();

    const response = await fetch(`${LOGIN_API_URL}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginRequest),
    });

    if (response.ok) {
      const res = await response.json();
      const token = res.access_token;
      const selectedRole = loginRequest.role.toLowerCase();

      sessionStorage.setItem("auth-token", token);
      if (selectedRole === "admin") {
        sessionStorage.setItem("active-admin", JSON.stringify(res));
      } else if (selectedRole === "doctor") {
        sessionStorage.setItem("active-doctor", JSON.stringify(res));
      } else if (selectedRole === "researcher") {
        sessionStorage.setItem("active-researcher", JSON.stringify(res));
      }

      toast.success("logged in successfully!!!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      navigate("/");
      window.location.reload(true);
    } else {
      setErrorMessage(
        "Something wrong with your credentials. Please try again!"
      );
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  };

  return (
    <div>
      <div className="mt-2 d-flex aligns-items-center justify-content-center">
        <div
          className="card form-card border-color custom-bg"
          style={{ width: "25rem" }}
        >
          <div className="card-header bg-color text-center custom-bg-text">
            <h4 className="card-title">User Login</h4>
          </div>
          <div className="card-body">
            {errorMessage !== "" && (
              <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
            )}

            <form>
              <div class="mb-3 text-color">
                <label for="role" class="form-label">
                  <b>User Role</b>
                </label>
                <select
                  onChange={(e) => {
                    handleUserInput(e);
                    handleRoleChange(e);
                  }}
                  className="form-control"
                  name="role"
                  required
                >
                  <option value="0">Select Role</option>
                  <option value="admin"> Admin </option>
                  <option value="researcher">Researcher</option>
                  <option value="doctor"> Doctor </option>
                </select>
              </div>
              {showCredentials && (
                <>
                  <div className="mb-3 text-color">
                    <label for="emailId" class="form-label">
                      <b>Email Id</b>
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="emailId"
                      name="emailId"
                      onChange={handleUserInput}
                      value={loginRequest.emailId}
                    />
                  </div>
                  <div className="mb-3 text-color">
                    <label for="password" className="form-label">
                      <b>Password</b>
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      onChange={handleUserInput}
                      value={loginRequest.password}
                    />
                  </div>
                </>
              )}

              <button
                type="submit"
                className="btn bg-color custom-bg-text"
                onClick={loginAction}
              >
                Login
              </button>
              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLoginForm;
