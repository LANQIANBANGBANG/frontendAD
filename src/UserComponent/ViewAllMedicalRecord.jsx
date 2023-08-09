import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { Pagination } from "./Pagination";
import { RECORD_API_URL } from "../config/config";

export const ViewAllMedicalRecord = () => {
  const [allMedicalRecord, setAllMedicalRecord] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRecords = allMedicalRecord.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const getAllMedicalRecord = async () => {
      try {
        const allMedicalRecordData = await retrieveAllMedicalRecord();
        if (allMedicalRecordData) {
          setAllMedicalRecord(allMedicalRecordData);
        }
      } catch (error) {
        console.error("Error retrieving medical records:", error);
      }
    };

    getAllMedicalRecord();
  }, []);

  const retrieveAllMedicalRecord = async () => {
    try {
      const response = await axios.get(`${RECORD_API_URL}`);
      return response.data.data.recordlist;
    } catch (error) {
      console.error("Error retrieving medical records:", error);
      throw error;
    }
  };

  const handleDeleteAction = async (recordId) => {
    try {
      const response = await axios.delete(`${RECORD_API_URL}/${recordId}`);
      if (response.data.success) {
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
                  <th scope="col">Id</th>
                  <th scope="col">Patient Id</th>
                  <th scope="col">Date Created</th>
                  <th scope="col">Record Features</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {allMedicalRecord.map((medicalRecord) => {
                  return (
                    <tr>
                      <td>
                        <p>{medicalRecord.id}</p>
                      </td>
                      <td>
                        <p>{medicalRecord.patientId}</p>
                      </td>
                      <td>
                        <p>{medicalRecord.date}</p>
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
