import axios from "axios";
import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { FeatureTable } from "./FeatureTable";
import { useNewRecord } from "./newRecord";
import { RECORD_API_URL } from "../config/config";

export const AddMedicalRecordPage = () => {
  const navigate = useNavigate();
  const { newRecord, setNewRecord } = useNewRecord();
  const initialRecordState = JSON.stringify(newRecord);

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

  const handleSaveRecord = async (e) => {
    e.preventDefault();

    try {
      const recordFeaturesObj = newRecord.recordFeatures.reduce(
        (acc, feature) => {
          acc[feature.name] = feature.value;
          return acc;
        },
        {}
      );
      const postData = {
        patientId: newRecord.patientId,
        date: newRecord.date,
        recordFeatures: recordFeaturesObj,
      };
      const response = await axios.post(RECORD_API_URL, postData);
      if (response.data.success) {
        setNewRecord(initialRecordState);
        console.log(newRecord);
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
        <div className="row mt-3 mb-3">
          <div>
            <button className="btn btn-primary" type="submit">
              Save Record
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
