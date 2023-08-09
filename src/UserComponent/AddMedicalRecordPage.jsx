import axios from "axios";
import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { FeatureTable } from "./FeatureTable";
import { useNewRecord } from "./newRecord";
import { RECORD_API_URL } from "../config/config";
import { CustomFeatureForm } from "./CustomFeatureForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AddMedicalRecordPage = () => {
  const navigate = useNavigate();
  const { newRecord, setNewRecord } = useNewRecord();
  const initialRecordState = JSON.stringify(newRecord);
  const [customFeatures, setCustomFeatures] = useState([]);
  const [showCustomFeatureForm, setShowCustomFeatureForm] = useState(false);
  const [showAddCustomFeaturesButton, setShowAddCustomFeautresButton] =
    useState(true);

  const handlePatientIdChange = (e) => {
    setNewRecord((prev) => ({
      ...prev,
      patientId: e.target.value,
    }));
  };

  const handleDateChange = (e) => {
    setNewRecord((prev) => ({
      ...prev,
      date: e.target.value,
    }));
  };
  const handleFeaturesChange = (name, value) => {
    const feature = newRecord.recordFeatures.find((f) => f.name === name);
    if (feature.isAutoCalculated) {
      return;
    }
    setNewRecord((prev) => ({
      ...prev,
      recordFeatures: prev.recordFeatures.map((feature) =>
        feature.name === name ? { ...feature, value } : feature
      ),
    }));
    console.log(newRecord);
  };
  const handleAddCustomFeatures = () => {
    setShowCustomFeatureForm(true);
    setShowAddCustomFeautresButton(false);
  };

  const handleCustomFeatureSubmit = (customFeatureData) => {
    if (customFeatureData == null) {
      console.log("customfeaturedata is null");
    }
    const newCustomFeature = {
      name: customFeatureData.name,
      label: customFeatureData.name,
      type: "text",
      value: customFeatureData.value,
    };
    setCustomFeatures((prevFeatures) => [...prevFeatures, newCustomFeature]);
    console.log("custom features new: " + JSON.stringify(customFeatures));
    setShowCustomFeatureForm(false);
  };
  const handleDeleteCustomFeature = (index) => {
    setCustomFeatures((prevFeatures) => {
      const newFeatures = [...prevFeatures];
      newFeatures.splice(index, 1);
      return newFeatures;
    });
  };

  const handleSaveRecord = async (e) => {
    e.preventDefault();
    if (!newRecord.patientId) {
      console.log("toast should come up!");
    }
    if (!newRecord.patientId || !newRecord.date) {
      toast.error("You must fill in all compulsory fields!!!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    const missingFeatures = newRecord.recordFeatures.filter(
      (feature) => feature.isRequired && !feature.value
    );
    if (missingFeatures.length > 0) {
      toast.error("You must fill in all compulsory fields!!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    try {
      const allFeatures = [...newRecord.recordFeatures, ...customFeatures];

      const recordFeaturesObj = allFeatures.reduce((acc, feature) => {
        acc[feature.name] = feature.value;
        return acc;
      }, {});
      const postData = {
        patientId: newRecord.patientId,
        date: newRecord.date,
        recordFeatures: recordFeaturesObj,
      };
      const response = await axios.post(RECORD_API_URL, postData);
      if (response.data.success) {
        setNewRecord(initialRecordState);
        navigate("/record/all");
      } else {
        console.log("Failed to add record:");
      }
    } catch (error) {
      console.error("Error adding record:", error);
    }
  };

  return (
    <form onSubmit={handleSaveRecord}>
      <div className="form-group m-3">
        <ToastContainer />
        <h3 className="text-center">Add New Medical Record</h3>
        <h4>Basic Info</h4>
        <div className="d-flex flex-row align-items-center mt-2">
          <div className="form-group">
            <label htmlFor="patientId">
              <b>Patient Id*</b>{" "}
            </label>
            <input
              className="form-control"
              type="text"
              id="patientId"
              value={newRecord.patientId}
              onChange={handlePatientIdChange}
              placeholder="Enter patient ID"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">
              <b>Date Created*</b>{" "}
            </label>
            <input
              className="form-control"
              type="date"
              id="date"
              value={newRecord.date}
              onChange={handleDateChange}
              required
            />
          </div>
        </div>
        <FeatureTable
          newRecord={newRecord}
          handleFeaturesChange={handleFeaturesChange}
        />
        <div>
          <h4>Custom Features</h4>
          <ul>
            {customFeatures.map((feature, index) => (
              <div key={index} className="custom-attribute">
                <p>
                  <strong>{feature.name}</strong>: {feature.value}
                </p>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteCustomFeature(index)}
                >
                  Delete
                </button>
              </div>
            ))}
          </ul>
        </div>
        {showCustomFeatureForm && (
          <div>
            <CustomFeatureForm
              onAddFeature={(customFeatureData) => {
                handleCustomFeatureSubmit(customFeatureData);
                setShowAddCustomFeautresButton(true);
              }}
              onCancel={() => {
                setShowCustomFeatureForm(false);
                setShowAddCustomFeautresButton(true);
              }}
            />
          </div>
        )}
        {showAddCustomFeaturesButton && (
          <button
            className="btn btn-warning"
            type="button"
            onClick={handleAddCustomFeatures}
          >
            Add Custom Features
          </button>
        )}
        <div className="row mt-3 mb-3">
          <div className="button-group">
            <p>* are compulsory fileds</p>
            <button className="btn btn-primary me-1" type="submit">
              Save Record
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
