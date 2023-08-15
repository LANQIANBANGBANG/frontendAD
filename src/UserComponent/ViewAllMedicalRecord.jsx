import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { Pagination } from "./Pagination";
import { RECORD_API_URL } from "../config/config";
import { GeneratePatientId } from "../utils/GeneratePatientId";

export const ViewAllMedicalRecord = () => {
  const [allMedicalRecord, setAllMedicalRecord] = useState([]);
  const [originalRecordList, setOriginalDoctorList] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const sortedRecords = [...allMedicalRecord].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const [searchQuery, setSearchQuery] = useState("");
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const token = sessionStorage.getItem("auth-token");
  console.log("token: ", token);
  const [showIncompleteRecords, setShowIncompleteRecords] = useState(false);

  useEffect(() => {
    const getAllMedicalRecord = async () => {
      try {
        const allMedicalRecordData = await retrieveAllMedicalRecord();
        if (allMedicalRecordData) {
          const recordsWithPatientId = allMedicalRecordData.map((record) => {
            return record;
          });
          setAllMedicalRecord(recordsWithPatientId);
          setOriginalDoctorList(recordsWithPatientId);
        }
      } catch (error) {
        console.error("Error retrieving medical records:", error);
      }
    };

    getAllMedicalRecord();
  }, []);

  const handleInCompleteFilter = () => {
    setShowIncompleteRecords(true);
  };
  const handleSetBack = () => {
    setShowIncompleteRecords(false);
  };

  // const handleIncompleteFilter = () => {
  //   setShowIncompleteRecords(!showIncompleteRecords);

  //   const filteredRecords = allMedicalRecord.filter((record) => {
  //     const isComplete =
  //       record.recordFeatures != null &&
  //       Object.keys(record.recordFeatures)
  //         .slice(0, 7)
  //         .every(
  //           (key) =>
  //             record.recordFeatures[key] !== "" &&
  //             record.recordFeatures[key] !== null
  //         );

  //     return showIncompleteRecords ? !isComplete : true;
  //   });
  //   console.log("filtered", filteredRecords);

  //   setAllMedicalRecord(filteredRecords);
  // };

  const retrieveAllMedicalRecord = async () => {
    try {
      const response = await fetch(`${RECORD_API_URL}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data.data.recordlist;
      }
    } catch (error) {
      console.error("Error retrieving medical records:", error);
      throw error;
    }
  };

  const handleDeleteAction = async (recordId) => {
    try {
      const response = await fetch(`${RECORD_API_URL}/${recordId}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("Record Deleted successfully!!!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  const filteredRecords = sortedRecords.filter((record) => {
    return record.name.includes(searchQuery);
  });
  const currentRecords = filteredRecords.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <div className="mt-3">
      <div
        className="card form-card ms-2 me-2 mb-5 custom-bg border-color "
        style={{
          height: "45rem",
        }}
      >
        <div className="card-header custom-bg-text text-center bg-color">
          <h2>Medical Record List</h2>
        </div>
        <div
          className="card-body min-vh-100"
          style={{
            overflowY: "auto",
          }}
        >
          <div className="mb-3 d-flex align-items-center">
            <Link to="/add-medical-record" className="btn btn-primary me-2">
              <i className="bi bi-plus"></i>
              Add New Medical Record
            </Link>
            <button
              className={`btn ${
                showIncompleteRecords ? "btn-success" : "btn-danger"
              }`}
              onClick={
                showIncompleteRecords ? handleSetBack : handleInCompleteFilter
              }
            >
              <i className="bi bi-plus"></i>
              {showIncompleteRecords ? "Show All" : "Incomplete Only"}
            </button>
            <div className="ms-2">
              <input
                type="text"
                className="form-control"
                placeholder="Search patient name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-hover text-color text-center">
              <thead className="table-bordered border-color bg-color custom-bg-text">
                <tr className="text-center">
                  <th scope="col">Status</th>
                  <th scope="col">Record Id</th>
                  <th scope="col">Patient Id</th>
                  <th scope="col">Patient Name</th>
                  <th scope="col">Date Created</th>
                  <th scope="col">Record Features</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentRecords.map((medicalRecord) => {
                  const isComplete =
                    medicalRecord.recordFeatures != null &&
                    Object.keys(medicalRecord.recordFeatures)
                      .slice(0, 7)
                      .every(
                        (key) =>
                          medicalRecord.recordFeatures[key] !== "" &&
                          medicalRecord.recordFeatures[key] !== null
                      );
                  if (
                    !showIncompleteRecords ||
                    (showIncompleteRecords && !isComplete)
                  ) {
                    return (
                      <tr key={medicalRecord.id}>
                        <td
                          style={{
                            color: isComplete ? "green" : "red",
                            fontWeight: "bold",
                          }}
                        >
                          {isComplete ? "Complete" : "Incomplete"}
                        </td>
                        <td>
                          <p>
                            {medicalRecord.id
                              ? medicalRecord.id.slice(0, 6) + "****"
                              : ""}
                          </p>
                        </td>
                        <td>
                          <p>
                            {medicalRecord.patientId
                              ? medicalRecord.patientId.slice(0, 6) + "****"
                              : ""}
                          </p>
                        </td>
                        <td>
                          <p>{medicalRecord.name}</p>
                        </td>
                        <td>
                          <p>
                            {medicalRecord.date
                              ? medicalRecord.date.slice(0, 10)
                              : ""}
                          </p>
                        </td>
                        <td>
                          <Link to={`/record/features/${medicalRecord.id}`}>
                            Check Content Details
                          </Link>
                        </td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                              handleDeleteAction(medicalRecord.id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  }
                  return null;
                })}
              </tbody>
            </table>
          </div>
          <Pagination
            totalItems={allMedicalRecord.length}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};
