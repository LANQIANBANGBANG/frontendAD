import React from "react";
import { useEffect, useState } from "react";
//import axios from "axios";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { Pagination } from "./Pagination";
import { RECORD_API_URL, SEND_RESEARCH_URL } from "../config/config";
//import { GeneratePatientId } from "../utils/GeneratePatientId";
import { DeleteConfirmation } from "../utils/DeleteCofirmationCheck";

export const ViewAllMedicalRecord = () => {
  const [allMedicalRecord, setAllMedicalRecord] = useState([]);
  //const [originalRecordList, setOriginalDoctorList] = useState([]);

  const [isSelectMode, setIsSelectMode] = useState(false);
  const [featuresOfRecord, setFeaturesOfRecord] = useState({}); //this is to get the features of a specific record
  const [healthyResultList, setHealthyResultList] = useState({}); //get healthy result from the researcher for each record on the page;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const sortedRecords = [...allMedicalRecord].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchIdQuery, setSearchIdQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const token = sessionStorage.getItem("auth-token");
  //console.log("token: ", token);
  const [showIncompleteRecords, setShowIncompleteRecords] = useState(false);
  const [sentStatusDictionary, setSentStatusDictionary] = useState({});

  const fetchRecordHealthyData = async (records) => {
    const healthyStatusDictionary = {};
    for (const medicalRecord of records) {
      try {
        const response = await fetch(
          `${SEND_RESEARCH_URL}/${medicalRecord.id}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const responseData = await response.json();
          //console.log(responseData.data.result);
          let result = responseData.data.result;
          if (result === "0") {
            healthyStatusDictionary[medicalRecord.id] = "Healthy";
          } else if (result === "1") {
            healthyStatusDictionary[medicalRecord.id] = "Cautious";
          }
        } else {
          healthyResultList[medicalRecord.id] = "Pending";
        }
        console.log(
          `Healthy status for record ${medicalRecord.id}: ${
            healthyStatusDictionary[medicalRecord.id]
          }`
        );
      } catch (error) {
        console.error(error);
      }
    }
    setHealthyResultList(healthyStatusDictionary);
  };

  useEffect(() => {
    const getAllMedicalRecord = async () => {
      try {
        const allMedicalRecordData = await retrieveAllMedicalRecord();
        if (allMedicalRecordData) {
          const recordsWithPatientId = allMedicalRecordData.map((record) => {
            return record;
          });
          await Promise.all([
            fetchSentStatusForRecords(recordsWithPatientId),
            //fetchRecordHealthyData(recordsWithPatientId),
          ]);

          setAllMedicalRecord(recordsWithPatientId);
          //setOriginalDoctorList(recordsWithPatientId);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error retrieving medical records:", error);
        setIsLoading(false);
      }
    };
    const fetchSentStatusForRecords = async (records) => {
      const updatedSentStatusDictionary = {};
      for (const medicalRecord of records) {
        try {
          const sendExists = await CheckIfSentExists(medicalRecord.id);
          updatedSentStatusDictionary[medicalRecord.id] = sendExists;
          // console.log(
          //   `Sent status for record ${medicalRecord.id}: ${sendExists}`
          // );
        } catch (error) {
          console.error("Error checking if sent exists: ", error);
        }
      }
      // console.log(
      //   "Updated sent status dictionary: ",
      //   updatedSentStatusDictionary
      // );
      setSentStatusDictionary(updatedSentStatusDictionary);
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
  const [recordToDelete, setRecordToDelete] = useState(null);

  const handleDeleteButtonClick = (id) => {
    setRecordToDelete(id);
    setShowConfirmation(true);
  };
  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };

  const handleDeleteAction = async (recordId) => {
    setShowConfirmation(false);
    setRecordToDelete(null);
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
    const nameMatch = record.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const idMatch = record.patientId.includes(searchIdQuery);

    if (searchQuery && searchIdQuery) {
      return nameMatch && idMatch;
    } else if (searchQuery) {
      return nameMatch;
    } else if (searchIdQuery) {
      return idMatch;
    }
    return true;
  });
  const currentRecords = filteredRecords.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const fetchAllFeaturesOfRecord = async (recordId) => {
    try {
      const response = await fetch(`${RECORD_API_URL}/${recordId}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const responseData = await response.json();
        const existingFeatures = responseData.data.medicalRecord.recordFeatures;
        //console.log("existingfeatureRecord: ", existingFeatures);
        // const updatedFeatures = {
        //   ...existingFeatures,
        //   sent: "true",
        // };

        setFeaturesOfRecord(existingFeatures);
        return existingFeatures;
        //
        //console.log("features of record, ", featuresOfRecord);
        //debugger;

        //console.log("newfeatureRecord: ", featuresOfRecord);
        //add a feature called "sent":true
      }
    } catch (error) {
      console.error("Error fetching features: ", error);
    }
  };
  console.log("token: ", token);

  const updateSentToBackEnd = async (recordId, updatedFeatures) => {
    try {
      const response = await fetch(`${RECORD_API_URL}/${recordId}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recordFeatures: updatedFeatures }),
      });
      if (response.ok) {
        console.log("updated record successfully!");
      }
    } catch (error) {
      console.error("Error fetching features: ", error);
    }
  };

  const [selectedRecords, setSelectedRecords] = useState({}); //store all the records which will be sent to the researcher

  const handleSelectRecords = () => {
    setIsSelectMode(true);
  };

  //console.log("existingfeatures: ", featuresOfRecord);
  const processRecord = async (recordId) => {
    try {
      const existingFeatures = await fetchAllFeaturesOfRecord(recordId);
      const updatedFeatures = { ...existingFeatures, sent: true };
      await updateSentToBackEnd(recordId, updatedFeatures);

      // ... other processing steps ...
    } catch (error) {
      console.error(`Error processing record ${recordId}:`, error);
    }
  };
  //this function will send record to researcher and waiting for result
  const sendToResearcher = async (recordId) => {
    try {
      const response = await fetch(`${SEND_RESEARCH_URL}/${recordId}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        toast.success(`Record ${recordId} Sent Successfully!!!`, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirmSend = async () => {
    const selectedRecordIds = Object.keys(selectedRecords).filter(
      (recordId) => selectedRecords[recordId] === true
    );

    try {
      for (const recordId of selectedRecordIds) {
        // await fetchAllFeaturesOfRecord(recordId);
        // const existingFeatures = featuresOfRecord;
        //console.log("existingfeatures: ", existingFeatures);
        await processRecord(recordId);
        sendToResearcher(recordId);
        //debugger;
        // console.log(`Record ${recordId} processed successfully.`);
        // debugger;
      }

      console.log("All records processed successfully.");
      // Additional actions...
    } catch (error) {
      console.error("Error processing records:", error);
    }

    setIsSelectMode(false); // Exit selection mode after confirming send
    setSelectedRecords({});
  };

  const handleCancelSend = () => {
    setSelectedRecords({}); // Clear selected records
    setIsSelectMode(false); // Exit selection mode
  };

  const handleCheckboxChange = async (recordId) => {
    setSelectedRecords((prevSelectedRecords) => ({
      ...prevSelectedRecords,
      [recordId]: !prevSelectedRecords[recordId],
    }));
  };
  //console.log("selectedRecords: ", selectedRecords);

  const CheckIfSentExists = async (recordId) => {
    try {
      const response = await fetch(`${RECORD_API_URL}/${recordId}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        //console.log("checking if this record has been sent!");
        const responseData = await response.json();
        const recordFeatures = responseData.data.medicalRecord.recordFeatures;

        if (
          recordFeatures &&
          typeof recordFeatures === "object" &&
          "sent" in recordFeatures
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        console.log("something went wrong during the checking process.");
        return false;
      }
    } catch (error) {
      console.error("An error occurred:", error);
      return false;
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="loading-indicator">
          <div className="d-flex flex-column justify-content-center align-items-center vh-100">
            <div className="spinner-border text-secondary" role="status">
              <span className="sr-only"></span>
            </div>
            <span className="mt-2">We have a lot of data to fetch...</span>
            <span>Please be patient...</span>
          </div>
        </div>
      ) : (
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
            <DeleteConfirmation
              show={showConfirmation}
              onClose={handleCloseConfirmation}
              onConfirm={() => handleDeleteAction(recordToDelete)}
            />
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

                {!isSelectMode && (
                  <button
                    className="btn btn-primary me-2"
                    onClick={handleSelectRecords}
                  >
                    Select Records
                  </button>
                )}

                {isSelectMode && (
                  <div>
                    <button
                      className="btn btn-success me-2"
                      onClick={handleConfirmSend}
                    >
                      Confirm Send
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={handleCancelSend}
                    >
                      Cancel
                    </button>
                  </div>
                )}

                <div className="ms-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search patient name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="ms-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search patient Id..."
                    value={searchIdQuery}
                    onChange={(e) => setSearchIdQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="table-responsive">
                <table className="table table-hover text-color text-center">
                  <thead className="table-bordered border-color bg-color custom-bg-text">
                    <tr className="text-center">
                      {isSelectMode && <th scope="col">Sent</th>}
                      <th scope="col">Complete Status</th>
                      <th scope="col">Healthy Status</th>
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
                      const sentExists = sentStatusDictionary[medicalRecord.id];
                      //console.log("medicalRecord.id:", medicalRecord.id);
                      //console.log("sentExists:", sentExists);
                      if (
                        !showIncompleteRecords ||
                        (showIncompleteRecords && !isComplete)
                      ) {
                        return (
                          <tr key={medicalRecord.id}>
                            {isSelectMode && (
                              <td>
                                {sentExists ? (
                                  <span
                                    style={{
                                      color: "green",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    /
                                  </span>
                                ) : !isComplete ? (
                                  <span
                                    style={{ color: "red", fontWeight: "bold" }}
                                  >
                                    X
                                  </span>
                                ) : (
                                  <input
                                    type="checkbox"
                                    onChange={() =>
                                      handleCheckboxChange(medicalRecord.id)
                                    }
                                  />
                                )}
                              </td>
                            )}
                            <td
                              style={{
                                color: isComplete ? "green" : "red",
                                fontWeight: "bold",
                              }}
                            >
                              {isComplete ? "Complete" : "Incomplete"}
                            </td>
                            <td
                              style={{
                                color:
                                  healthyResultList[medicalRecord.id] ===
                                  "Healthy"
                                    ? "green"
                                    : healthyResultList[medicalRecord.id] ===
                                      "Cautious"
                                    ? "red"
                                    : "gray",
                                fontWeight: "bold",
                              }}
                            >
                              {healthyResultList[medicalRecord.id] === "Healthy"
                                ? "Healthy"
                                : healthyResultList[medicalRecord.id] ===
                                  "Cautious"
                                ? "Cautious"
                                : "Pending"}
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
                                className="btn btn-outline-danger"
                                onClick={() =>
                                  handleDeleteButtonClick(medicalRecord.id)
                                }
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
      )}
    </>
  );
};
