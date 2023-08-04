import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNewRecord } from "./newRecord";
import { ButtonGroup } from "react-bootstrap";
import { toast } from "react-toastify";
import { Pagination } from "./Pagination";
import { RECORD_API_URL } from "../config/config";

export const FeaturesForm = () => {
  const { newRecord } = useNewRecord();
  const { recordId } = useParams();

  const [features, setFeatures] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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
      const response = await axios.put(
        `${RECORD_API_URL}/${recordId}`,
        updatedRecord
      );
      if (response.data.success) {
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

  useEffect(() => {
    const fetchFeaturesData = async () => {
      try {
        console.log("record id: " + recordId);
        const response = await axios.get(`${RECORD_API_URL}/${recordId}`);

        const featureData = response.data.data.medicalRecord.recordFeatures;
        setFeatures(featureData);
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };

    fetchFeaturesData();
  }, [recordId]);

  return (
    <div className="mt-3">
      <div className="card form-card ms-2 me-2 mb-5 custom-bg border-color ">
        <div className="row align-items-center">
          <div className="col">
            <h2 className="text-center mb-2">Features List</h2>
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
                Edit Features
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
                        value={features[feature.name]}
                        onChange={(e) => {
                          setFeatures((prevFeatures) => ({
                            ...prevFeatures,
                            [feature.name]: e.target.value,
                          }));
                        }}
                      >
                        {feature.options.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        value={features[feature.name]}
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
