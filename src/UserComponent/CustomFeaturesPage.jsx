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
  const features = JSON.parse(
    new URLSearchParams(location.search).get("features")
  );

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
      const response = await axios.get(`${RECORD_API_URL}/${recordId}`);

      const featureData = response.data.data.medicalRecord.recordFeatures;

      setCustomFeatures(featureData);
      console.log("Customfeatures", featureData);
    };

    fetchCustomFeaturesData();
  }, [recordId]);
  //console.log("newRecordFeatures", newRecord.recordFeatures);

  const newRecordFeatureNames = newRecord.recordFeatures.map(
    (feature) => feature.name
  );
  const filteredCustomFeatures = Object.keys(customFeatures)
    .filter((name) => !newRecordFeatureNames.includes(name))
    .map((name) => ({ name, value: customFeatures[name] }));

  console.log("filteredCustomFeatures", filteredCustomFeatures);

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
      const updatedRecord = {
        recordFeatures: updatedFeatures,
      };
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
      console.error("Error updating record: ", error);
    }
  };
  return (
    <div>
      <h2>Custom Features List</h2>
      <form>
        <ul>
          {filteredCustomFeatures.map((feature) => (
            <li key={feature.name}>
              <b>{feature.name}</b>:
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
                />
              ) : (
                feature.value
              )}
              <button
                type="button"
                onClick={() => handleDeleteFeature(feature.name)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
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
    </div>
  );
};
