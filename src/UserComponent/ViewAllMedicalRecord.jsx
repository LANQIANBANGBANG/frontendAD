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

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRecords = allMedicalRecord.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const token = sessionStorage.getItem("auth-token");
  //console.log("token: ", token);

  useEffect(() => {
    const getAllMedicalRecord = async () => {
      try {
        const allMedicalRecordData = await retrieveAllMedicalRecord();
        if (allMedicalRecordData) {
          const recordsWithPatientId = allMedicalRecordData.map((record) => {
            const recordFeatures = record.recordFeatures || {};
            return record;
          });
          setAllMedicalRecord(recordsWithPatientId);
        }
      } catch (error) {
        console.error("Error retrieving medical records:", error);
      }
    };

    getAllMedicalRecord();
  }, []);

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

  return (
    <div className="mt-3">
      <div
        className="card form-card ms-2 me-2 mb-5 custom-bg border-color "
        style={{
          height: "45rem",
        }}
      >
        <div className="card-header custom-bg-text text-center bg-color">
          <h2>All Medical Record</h2>
        </div>
        <div
          className="card-body min-vh-100"
          style={{
            overflowY: "auto",
          }}
        >
          <div className="mb-3">
            <Link to="/add-medical-record" className="btn btn-primary">
              <i className="bi bi-plus me-2"></i>
              Add New Medical Record
            </Link>
          </div>
          <div className="table-responsive">
            <table className="table table-hover text-color text-center">
              <thead className="table-bordered border-color bg-color custom-bg-text">
                <tr className="text-center">
                  <th scope="col">Complete Check</th>
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
                      <td>
                        <p>{medicalRecord.id.slice(0, 6) + "****"}</p>
                      </td>
                      <td>
                        <p>{medicalRecord.patientId.slice(0, 6) + "****"}</p>
                      </td>
                      <td>
                        <p>{medicalRecord.name}</p>
                      </td>
                      <td>
                        <p>
                          {new Date(medicalRecord.date)
                            .toISOString()
                            .slice(0, 10)}
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
                })}
              </tbody>
            </table>
          </div>
        </div>
        <Pagination
          totalItems={allMedicalRecord.length}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};
