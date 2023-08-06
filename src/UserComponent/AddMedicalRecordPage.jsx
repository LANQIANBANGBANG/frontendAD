import axios from "axios";
import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { FeatureTable } from "./FeatureTable";
import { useNewRecord } from "./newRecord";
import { RECORD_API_URL } from "../config/config";
import { CustomFeatureForm } from "./CustomFeatureForm";

export const AddMedicalRecordPage = () => {
  const navigate = useNavigate();
  const { newRecord, setNewRecord } = useNewRecord();
  const initialRecordState = JSON.stringify(newRecord);
  const [customFeatures, setCustomFeatures] = useState([]);
  const [showCustomFeatureForm, setShowCustomFeatureForm] = useState(false);

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

  const handleSaveRecord = async (e) => {
    e.preventDefault();

    try {
      const allFeatures = [...newRecord.recordFeatures, ...customFeatures];
      console.log("all features???: " + JSON.stringify(allFeatures));

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
      <div className="form-group mt-3">
        <h3>Add New Medical Record</h3>
        <div className="row">
          <div>
            <label htmlFor="patientId">Patient Id </label>
            <input
              className="form-control"
              type="text"
              id="patientId"
              value={newRecord.patientId}
              onChange={handlePatientIdChange}
              placeholder="Enter patient ID"
            />
          </div>
        </div>
        <div className="row mt-3">
          <div>
            <label htmlFor="date">Date Created </label>
            <input
              className="form-control"
              type="date"
              id="date"
              value={newRecord.date}
              onChange={handleDateChange}
            />
          </div>
        </div>
        <FeatureTable
          newRecord={newRecord}
          handleFeaturesChange={handleFeaturesChange}
        />
        <div>
          <h3>Custom Features:</h3>
          <ul>
            {customFeatures.map((feature, index) => (
              <div key={index}>
                <label htmlFor="customValue">{feature.name}</label>
                <input id="customValue" type="text" value={feature.value} />
              </div>
            ))}
          </ul>
        </div>
        {showCustomFeatureForm && (
          <div>
            <CustomFeatureForm
              onAddFeature={handleCustomFeatureSubmit}
              onCancel={() => {
                setShowCustomFeatureForm(false);
              }}
            />
          </div>
        )}
        <div className="row mt-3 mb-3">
          <div>
            <button className="btn btn-primary me-1" type="submit">
              Save Record
            </button>
            <button
              className="btn btn-warning"
              type="button"
              onClick={handleAddCustomFeatures}
            >
              Add Custom Features
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
