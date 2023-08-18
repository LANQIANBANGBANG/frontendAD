import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNewRecord } from "./newRecord";
import { ButtonGroup } from "react-bootstrap";
import { toast } from "react-toastify";
import { Pagination } from "./Pagination";
import { RECORD_API_URL } from "../config/config";
import { Link } from "react-router-dom";

export const FeaturesForm = () => {
  const { newRecord } = useNewRecord();
  const { recordId } = useParams();
  const [patientName, setPatientName] = useState("");
  const [patientId, setPatientId] = useState("");

  const token = sessionStorage.getItem("auth-token");

  const [features, setFeatures] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const encodedFeatures = encodeURIComponent(JSON.stringify(features));

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFeatures = newRecord.recordFeatures.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEditFeatureClick = () => {
    setIsEditing(true);
  };
  const handleCancelEditClick = () => {
    setIsEditing(false);
    window.location.reload();
  };

  const handleEditSaveClick = async () => {
    setIsEditing(false);
    const updatedRecord = {
      recordFeatures: features,
    };

    try {
      const response = await fetch(`${RECORD_API_URL}/${recordId}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedRecord),
      });
      if (response.ok) {
        toast.success("Features Updated Successfully!!!", {
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
      console.error("Error updating record:", error);
    }
  };
  //console.log("patient name", JSON.stringify(patientName));

  useEffect(() => {
    const fetchFeaturesData = async () => {
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
          setPatientName(responseData.data.medicalRecord.name);
          setPatientId(responseData.data.medicalRecord.patientId);

          const featureData = responseData.data.medicalRecord.recordFeatures;
          //console.log("featureData: ", featureData);
          if (featureData === null) {
            const emptyFeatures = {};
            newRecord.recordFeatures.forEach((feature) => {
              emptyFeatures[feature.name] = "";
            });
            setFeatures(emptyFeatures);
          } else {
            setFeatures(featureData);
          }
        }
      } catch (error) {
        console.error("Error fetching record data:", error);
      }
    };

    fetchFeaturesData();
  }, [recordId]);

  return (
    <div className="mt-3">
      <div className="card form-card ms-2 me-2 mb-5 custom-bg border-color ">
        <div className="row align-items-center">
          <div className="col">
            <h2 className="text-center mb-2">Medical Report</h2>
            <div className="d-flex justify-content-center">
              <p className="me-4">
                <b>Record</b> <i className="text-secondary">{recordId}</i>
              </p>
              <p className="me-4">
                <b>Patient</b> <i className="text-secondary">{patientName}</i>
              </p>
              <p>
                <b>Patient Id</b> <i className="text-secondary">{patientId}</i>
              </p>
            </div>
          </div>
          <div className="col-auto">
            {isEditing ? (
              <ButtonGroup>
                <button
                  type="button"
                  className="btn btn-warning mt-2"
                  onClick={handleCancelEditClick}
                >
                  Cancel Edit
                </button>
                <button
                  type="button"
                  className="btn btn-success mt-2 ms-2"
                  onClick={handleEditSaveClick}
                >
                  Save Edit
                </button>
              </ButtonGroup>
            ) : (
              <button
                type="button"
                className="btn btn-warning mt-2"
                onClick={handleEditFeatureClick}
              >
                Edit Report
              </button>
            )}
          </div>
        </div>
        <table className="table">
          <tbody>
            {currentFeatures.map((feature) => (
              <tr key={feature.name}>
                <td>
                  <b>{feature.label}</b>
                </td>
                <td>
                  {isEditing ? (
                    feature.type === "select" ? (
                      <select
                        value={features[feature.name] || ""}
                        onChange={(e) => {
                          setFeatures((prevFeatures) => ({
                            ...prevFeatures,
                            [feature.name]: e.target.value,
                          }));
                        }}
                      >
                        <option value="">Select an option</option>
                        {feature.options.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        value={features[feature.name] || ""}
                        onChange={(e) => {
                          setFeatures((prevFeatures) => ({
                            ...prevFeatures,
                            [feature.name]: e.target.value,
                          }));
                        }}
                      />
                    )
                  ) : (
                    features[feature.name]
                  )}
                </td>
              </tr>
            ))}
            <Link
              to={`/custom-features/${recordId}?features=${encodedFeatures}`}
            >
              <button className="btn btn-primary">Show Custom Features</button>
            </Link>
          </tbody>
        </table>
        <Pagination
          totalItems={newRecord.recordFeatures.length}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};
