import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { ButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FINDRESEARCHER_API_URL, USER_API_URL } from "../../config/config";

export const ViewAllResearcher = () => {
  const [allResearcher, setAllResearcher] = useState([]);

  useEffect(() => {
    const getAllResearcher = async () => {
      const allResearcher = await retrieveAllResearcher();
      if (allResearcher) {
        setAllResearcher(allResearcher);
      }
    };

    getAllResearcher();
  }, []);
  console.log("All Researchers: ", allResearcher);

  const retrieveAllResearcher = async () => {
    const response = await axios.get(`${FINDRESEARCHER_API_URL}`);
    return response.data.data.roleList;
  };

  const deleteResearcher = (researcherId) => {
    fetch(`${USER_API_URL}/${researcherId}`, {
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
          throw new Error("Failed to delete researcher");
        }
      })
      .then((res) => {
        toast.success("Researcher deleted successfully.");
        window.location.reload(true);
      })
      .catch((error) => {
        toast.error("An error occurred whilte deleting the researcher.");
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
          <h2>All Researcher</h2>
        </div>
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
                {allResearcher.map((researcher) => {
                  return (
                    <tr>
                      <td>{researcher.firstName}</td>
                      <td>{researcher.lastName}</td>
                      <td>{researcher.emailId}</td>
                      <td>
                        <ButtonGroup>
                          <button
                            className="btn btn-primary me-1"
                            onClick={() => deleteResearcher(researcher.id)}
                          >
                            Delete
                          </button>
                          <Link to={`/user/researcher/update/${researcher.id}`}>
                            <button className="btn btn-primary ">Update</button>
                          </Link>
                        </ButtonGroup>
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
