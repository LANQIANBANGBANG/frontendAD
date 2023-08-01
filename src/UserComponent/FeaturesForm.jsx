import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";

export const FeaturesForm = () => {
  const { recordId } = useParams();

  const [features, setFeatures] = useState({});
  const [showModal, setShowModel] = useState(false);
  const [newFeature, setNewFeature] = useState({ name: "", content: "" });

  const handleAddFeatureClick = () => {
    setShowModel(true);
  };
  const handleModalClose = () => {
    setShowModel(false);
  };
  const handleFeatureNameChange = (e) => {
    setNewFeature((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };
  const handleFeatureContentChange = (e) => {
    setNewFeature((prev) => ({
      ...prev,
      content: e.target.value,
    }));
  };
  const handleSaveFeature = () => {
    if (newFeature != null) {
      addNewFeature(newFeature);
      setNewFeature({ name: "", content: "" });
      updateRecordFeatures(features);
      handleModalClose();
    }
  };
  const addNewFeature = (newFeature) => {
    setFeatures((preFeatures) => ({
      ...preFeatures,
      [newFeature.name]: newFeature.content,
    }));
  };

  useEffect(() => {
    const fetchFeaturesData = async () => {
      try {
        console.log("record id: " + recordId);
        const response = await axios.get(
          `https://adproj.azurewebsites.net/record?id=${recordId}`
        );
        const featureData = response.data.data.recordlist[0].recordFeatures;
        setFeatures(featureData);
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };

    fetchFeaturesData();
  }, [recordId]);
  console.log("features.id: " + features.id);

  return (
    <div className="mt-3">
      <div className="card form-card ms-2 me-2 mb-5 custom-bg border-color ">
        <h2 className="text-center mb-5">Features List</h2>
        <table className="table">
          <tbody>
            {Object.entries(features).length > 0 ? (
              Object.entries(features).map(([key, value]) => (
                <tr key={key}>
                  <td>
                    <b>{key}</b>
                  </td>
                  <td>
                    {typeof value === "object" ? (
                      <pre>{JSON.stringify(value, null, 2)}</pre>
                    ) : (
                      value
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <p>No features right now</p>
            )}
          </tbody>
        </table>
        <button
          type="button"
          class="btn btn-primary mt-2"
          onClick={handleAddFeatureClick}
        >
          Add Features
        </button>

        <Modal isOpen={showModal} onRequestClose={handleModalClose}>
          <h3>Add New Feature</h3>
          <div>
            <label>Feature Name:</label>
            <input
              type="text"
              value={newFeature.name}
              onChange={handleFeatureNameChange}
            />
          </div>
          <div>
            <label>Feature Content:</label>
            <input
              type="text"
              value={newFeature.content}
              onChange={handleFeatureContentChange}
            />
          </div>
          <button type="button" onClick={handleSaveFeature}>
            Save Feature
          </button>
        </Modal>
      </div>
    </div>
  );
};
