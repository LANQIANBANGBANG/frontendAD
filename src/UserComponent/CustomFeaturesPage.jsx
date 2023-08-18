import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { RECORD_API_URL } from "../config/config";
import { useNewRecord } from "./newRecord";
import { toast } from "react-toastify";

export const CustomFeaturesPage = () => {
  const { recordId } = useParams();
  const { newRecord } = useNewRecord();
  const location = useLocation();
  // const features = JSON.parse(
  //   new URLSearchParams(location.search).get("features")
  // );
  const queryParams = new URLSearchParams(location.search);
  const encodedFeatures = queryParams.get("features");
  const features = JSON.parse(decodeURIComponent(encodedFeatures));
  const [newFeature, setNewFeature] = useState({ name: "", value: "" });

  const token = sessionStorage.getItem("auth-token");

  const [customFeatures, setCustomFeatures] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const handleEditCustomFeatureClick = () => {
    setIsEditing(true);
  };

  const handleCancelEditCustomFeatureClick = () => {
    setIsEditing(false);
    window.location.reload();
  };

  const handleSaveEditCustomFeature = async () => {
    setIsEditing(false);

    const updatedFeatures = { ...features };
    filteredCustomFeatures.forEach((filteredFeature) => {
      updatedFeatures[filteredFeature.name] = filteredFeature.value;
    });
    await updateCustomFeatures(updatedFeatures);
  };

  useEffect(() => {
    const fetchCustomFeaturesData = async () => {
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
          const featureData = responseData.data.medicalRecord.recordFeatures;
          setCustomFeatures(featureData);
          console.log("Customfeatures", featureData);
        }
      } catch (error) {
        console.log("Error fetching custom features record", error.message);
      }
    };

    fetchCustomFeaturesData();
  }, [recordId]);

  const newRecordFeatureNames = newRecord.recordFeatures.map(
    (feature) => feature.name
  );
  const filteredCustomFeatures = customFeatures
    ? Object.keys(customFeatures)
        .filter(
          (name) => !newRecordFeatureNames.includes(name) && name !== "sent"
        )
        .map((name) => ({ name, value: customFeatures[name] }))
    : [];

  console.log("token :", token);

  const handleDeleteFeature = (name) => {
    setCustomFeatures((prevFeatures) => {
      const updatedFeatures = { ...prevFeatures };
      delete updatedFeatures[name];
      updateCustomFeatures(updatedFeatures);
      return updatedFeatures;
    });
  };

  const updateCustomFeatures = async (updatedFeatures) => {
    try {
      //console.log("updatedfeatures: ", updatedFeatures);
      const updatedRecord = {
        recordFeatures: updatedFeatures,
      };
      //console.log("updateRecord: ", updatedRecord);

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
      console.error("Error updating record: ", error);
    }
  };

  return (
    <div
      className="card mt-3 d-flex align-items-center justify-content-center m-auto pb-5 pt-5"
      style={{ width: "50rem" }}
    >
      <h2 className="mb-2">Custom Features List</h2>
      <form className="form" style={{ width: 350 }}>
        {filteredCustomFeatures.length !== 0 ? (
          <ul className="list-group">
            {filteredCustomFeatures.map(
              (feature) =>
                feature.name !== "sent" && (
                  <li
                    key={feature.name}
                    className="list-group-item form-control"
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <form>
                        <div className="form-group feature-item d-flex flex-row justify-content-between">
                          <div>
                            <label>
                              <b>{feature.name}</b>
                            </label>
                          </div>
                          <div>
                            {isEditing ? (
                              <input
                                type="text"
                                value={feature.value}
                                onChange={(e) => {
                                  setCustomFeatures((prevFeatures) => ({
                                    ...prevFeatures,
                                    [feature.name]: e.target.value,
                                  }));
                                }}
                                className="form-control"
                              />
                            ) : (
                              <span className="feature-value">
                                {feature.value}
                              </span>
                            )}
                          </div>
                        </div>
                      </form>

                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDeleteFeature(feature.name)}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                )
            )}
          </ul>
        ) : (
          <div className="alert alert-warning" role="alert">
            <span style={{ textAlign: "center" }}>
              Oops! The doctor did not add custom features for this record.
            </span>
          </div>
        )}
      </form>

      <div>
        <button
          type="btn btn-primary"
          className="btn btn-primary me-1"
          onClick={() => {
            navigate(-1);
          }}
        >
          Go Back
        </button>
        {isEditing ? (
          <div>
            <button
              type="button"
              className="btn btn-success me-1 mt-1"
              onClick={handleSaveEditCustomFeature}
            >
              Save Edit
            </button>
            <button
              type="button"
              className="btn btn-warning mt-1"
              onClick={handleCancelEditCustomFeatureClick}
            >
              Cancel Edit
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="btn btn-warning"
            onClick={handleEditCustomFeatureClick}
          >
            Edit
          </button>
        )}
      </div>
      <form className="form-group">
        <div className="border p-3" style={{ width: 350 }}>
          <div className="form-group">
            <label>
              <b>Feature Name</b>
            </label>
            <input
              className="form-control"
              type="text"
              placeholder="Feature Name"
              value={newFeature.name}
              onChange={(e) =>
                setNewFeature({ ...newFeature, name: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>
              <b>Feature Value</b>
            </label>
            <input
              className="form-control"
              type="text"
              placeholder="Feature Value"
              value={newFeature.value}
              onChange={(e) =>
                setNewFeature({ ...newFeature, value: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            className="btn btn-success mt-2"
            onClick={() => {
              if (newFeature.name && newFeature.value) {
                updateCustomFeatures({
                  ...customFeatures,
                  [newFeature.name]: newFeature.value,
                });
                setNewFeature({ name: "", value: "" });
              }
            }}
          >
            Add Custom Feature
          </button>
        </div>
      </form>
    </div>
  );
};
