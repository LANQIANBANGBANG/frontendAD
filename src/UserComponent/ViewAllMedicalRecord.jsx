import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

export const ViewAllMedicalRecord = () => {
  const [allMedicalRecord, setAllMedicalRecord] = useState([]);

  useEffect(() => {
    const getAllMedicalRecord = async () => {
      try {
        const allMedicalRecordData = await retrieveAllMedicalRecord();
        console.log(allMedicalRecordData);
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
      const response = await axios.get(
        "https://adproj.azurewebsites.net/record"
      );
      return response.data.data.recordlist;
    } catch (error) {
      console.error("Error retrieving medical records:", error);
      throw error;
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
          className="card-body"
          style={{
            overflowY: "auto",
          }}
        >
          <div className="table-responsive">
            <table className="table table-hover text-color text-center">
              <thead className="table-bordered border-color bg-color custom-bg-text">
                <tr className="text-center">
                  <th scope="col">Id</th>
                  <th scope="col">Patient Id</th>
                  <th scope="col">Date Created</th>
                  <th scope="col">Record Features</th>
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
                          <b>Check Content Details</b>
                        </Link>
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
