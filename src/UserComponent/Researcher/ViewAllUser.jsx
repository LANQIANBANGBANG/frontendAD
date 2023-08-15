import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FIND_API_URL, USER_API_URL } from "../../config/config";

export const ViewAllUser = ({ userType }) => {
  const [allUser, setAllUser] = useState([]);

  useEffect(() => {
    const getAllUser = async () => {
      const retrieveAllUser = async () => {
        const response = await axios.get(`${FIND_API_URL}/${userType}`);
        return response.data.data.roleList;
      };

      const allUser = await retrieveAllUser();
      if (allUser) {
        setAllUser(allUser);
      }
    };

    getAllUser();
  }, [userType]);
  console.log("All Users: ", allUser);

  const deleteUser = (userId) => {
    fetch(`${USER_API_URL}/${userId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((result) => {
        if (result.ok) {
          return result.json();
        } else {
          throw new Error(`Failed to delete ${userType}`);
        }
      })
      .then((res) => {
        toast.success(`${userType} deleted successfully`);
        window.location.reload(true);
      })
      .catch((error) => {
        toast.error(`An error occurred whilte deleting the ${userType}`);
      });
  };

  return (
    <div className="mt-3">
      <div
        className="card form-card ms-2 me-2 mb-5 custom-bg border-color "
        style={{
          height: "45rem",
        }}
      >
        <div className="card-header custom-bg-text text-center bg-color">
          <h2>
            {userType.substring(0, 1).toUpperCase() +
              userType.toLowerCase().substring(1)}{" "}
            List
          </h2>
        </div>
        <Link
          to={`/user/${userType}/register`}
          className="nav-link active ms-5 mt-2"
          aria-current="page"
        >
          <button className="btn btn-warning">
            Register{" "}
            {userType.substring(0, 1).toUpperCase() +
              userType.toLowerCase().substring(1)}
          </button>
        </Link>
        <div
          className="card-body"
          style={{
            overflowY: "auto",
          }}
        >
          <div className="table-responsive">
            <table className="table table-hover text-color text-center">
              <thead className="table-bordered border-color bg-color custom-bg-text">
                <tr className="text-center">
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Email Id</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {allUser.map((user) => {
                  return (
                    <tr>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.emailId}</td>
                      <td>
                        <div>
                          <button
                            className="btn btn-outline-danger me-1"
                            onClick={() => deleteUser(user.id)}
                          >
                            Delete
                          </button>
                          <Link to={`/user/${userType}/update/${user.id}`}>
                            <button className="btn btn-outline-warning ">
                              Update
                            </button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
