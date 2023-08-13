import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { ButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FINDDOCTOR_API_URL, USER_API_URL } from "../config/config";
import { toast } from "react-toastify";

const ViewAllDoctor = () => {
  const [allDoctor, setAllDoctor] = useState([]);

  useEffect(() => {
    const getAllDoctor = async () => {
      const allDoctor = await retrieveAllDoctor();
      if (allDoctor) {
        setAllDoctor(allDoctor);
      }
    };

    getAllDoctor();
  }, []);

  const retrieveAllDoctor = async () => {
    const response = await axios.get(`${FINDDOCTOR_API_URL}`);
    return response.data.data.roleList;
  };

  const deleteDoctor = (doctorId) => {
    fetch(`${USER_API_URL}/${doctorId}`, {
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
          throw new Error("Failed to delete doctor");
        }
      })
      .then((res) => {
        toast.success("Doctor deleted successfully.");
        window.location.reload(true);
      })
      .catch((error) => {
        toast.error("An error occurred whilte deleting the doctor.");
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
          <h2>All Doctor</h2>
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
                  <th scope="col">Specialist</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Age</th>
                  <th scope="col">Email Id</th>
                  <th scope="col">Phone No</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {allDoctor.map((doctor) => {
                  return (
                    <tr>
                      <td>{doctor.specialist}</td>
                      <td>{doctor.firstName}</td>
                      <td>{doctor.lastName}</td>
                      <td>{doctor.age}</td>
                      <td>{doctor.emailId}</td>
                      <td>{doctor.phone}</td>
                      <td>
                        <ButtonGroup>
                          <button
                            className="btn btn-primary me-1"
                            onClick={() => deleteDoctor(doctor.id)}
                          >
                            Delete
                          </button>
                          <Link to={`/user/doctor/update/${doctor.id}`}>
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

export default ViewAllDoctor;
