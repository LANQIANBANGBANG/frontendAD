import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { FINDDOCTOR_API_URL, USER_API_URL } from "../config/config";
import { toast } from "react-toastify";
import { Pagination } from "./Pagination";
import { SPECIALISTS } from "../utils/Constant";
import { DeleteConfirmation } from "../utils/DeleteCofirmationCheck";

const ViewAllDoctor = () => {
  const [allDoctor, setAllDoctor] = useState([]);
  const [originalDoctorList, setOriginalDoctorList] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDoctors = allDoctor.slice(indexOfFirstItem, indexOfLastItem);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const getAllDoctor = async () => {
      const allDoctor = await retrieveAllDoctor();
      if (allDoctor) {
        setOriginalDoctorList(allDoctor);
        setAllDoctor(allDoctor);
      }
    };

    getAllDoctor();
  }, []);

  const handleSearch = () => {
    const filteredDoctors = allDoctor.filter((doctor) =>
      selectedDepartment ? doctor.specialist === selectedDepartment : true
    );
    setAllDoctor(filteredDoctors);
  };

  const retrieveAllDoctor = async () => {
    const response = await axios.get(`${FINDDOCTOR_API_URL}`);
    return response.data.data.roleList;
  };
  const [doctorToDelete, setDoctorToDelete] = useState(null);

  const handleDeleteButtonClick = (id) => {
    setDoctorToDelete(id);
    setShowConfirmation(true);
  };
  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };

  const deleteDoctor = async (doctorId) => {
    setShowConfirmation(false);
    setDoctorToDelete(null);
    await fetch(`${USER_API_URL}/${doctorId}`, {
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
          <h2>Doctor List</h2>
        </div>
        <DeleteConfirmation
          show={showConfirmation}
          onClose={handleCloseConfirmation}
          onConfirm={() => deleteDoctor(doctorToDelete)}
        />
        <div className="d-flex flex-column ms-5">
          <div className="d-flex align-items-center mt-1">
            <div className="d-flex me-5">
              <select
                className="form-select form-select-sm me-1"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                <option value="">Select Department</option>
                {Object.values(SPECIALISTS).map((s) => {
                  return (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  );
                })}
              </select>

              <button className="btn btn-primary me-1" onClick={handleSearch}>
                Search
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setSelectedDepartment("");
                  setAllDoctor(originalDoctorList);
                }}
              >
                Reset
              </button>
            </div>
            <Link
              to="/user/DOCTOR/register"
              className="nav-link active text-color"
              aria-current="page"
            >
              <button className="btn btn-warning">Register Doctor</button>
            </Link>
          </div>
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
                  <th scope="col">Status</th>
                  <th scope="col">Specialist</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Email Id</th>
                  <th scope="col">Phone No</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentDoctors.map((doctor) => {
                  const isComplete =
                    doctor.specialist != null &&
                    doctor.emailId != null &&
                    doctor.firstName != null &&
                    doctor.lastName != null;
                  return (
                    <tr>
                      <td
                        style={{
                          color: isComplete ? "green" : "red",
                          fontWeight: "bold",
                        }}
                      >
                        {isComplete ? "Complete" : "Incomplete"}
                      </td>
                      <td>{doctor.specialist}</td>
                      <td>{doctor.firstName}</td>
                      <td>{doctor.lastName}</td>
                      <td>{doctor.emailId}</td>
                      <td>{doctor.phone}</td>
                      <td>
                        <div>
                          <button
                            className="btn btn-outline-danger me-1"
                            onClick={() => handleDeleteButtonClick(doctor.id)}
                          >
                            Delete
                          </button>
                          <Link to={`/user/doctor/update/${doctor.id}`}>
                            <button className="btn btn-outline-warning ">
                              Edit
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
        <Pagination
          totalItems={allDoctor.length}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ViewAllDoctor;
