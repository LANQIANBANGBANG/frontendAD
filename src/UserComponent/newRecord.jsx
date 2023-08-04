import { useEffect, useState } from "react";
import { featureRestrictions } from "./FeatureRestrictions";

export const useNewRecord = () => {
  const [newRecord, setNewRecord] = useState({
    patientId: "",
    date: "",
    recordFeatures: [
      { name: "age", label: "Age*", type: "int", isRequired: true, value: "" },
      {
        name: "sex",
        label: "Sex*",
        type: "select",
        isRequired: true,
        options: ["Male", "Female"],
        value: "",
      },
      {
        name: "thalach",
        label: "Maximum Heart Rate*",
        type: "int",
        isRequired: true,
        value: "",
      },
      {
        name: "currentSmoker",
        label: "Smoke*",
        type: "select",
        isRequired: true,
        options: ["Yes", "No"],
        value: "",
      },
      {
        name: "diaBP",
        label: "Diastolic Blood Pressure*",
        type: "int",
        isRequired: true,
        value: "",
      },
      {
        name: "height",
        label: "Height*",
        type: "float",
        isRequired: true,
        isAutoCalculated: false,
        value: "",
      },
      {
        name: "weight",
        label: "Weight*",
        type: "float",
        isRequired: true,
        isAutoCalculated: false,
        value: "",
      },
      {
        name: "cp",
        label: "Chest Pain Type",
        type: "select",
        options: [
          "typical angina",
          "atypical angina",
          "non-anginal pain",
          "asymptomatic",
        ],
        value: "",
      },
      {
        name: "chol",
        label: "Serum Cholestoral in mg/dl",
        type: "int",
        value: "",
      },
      {
        name: "trestbps",
        label: "Resting Blood Pressure",
        type: "int",
        value: "",
      },
      {
        name: "fbs",
        label: "Fasting Blood Sugar",
        type: "int",
        value: "",
      },
      {
        name: "restecg",
        label: "Resting Electrocardiographic results",
        type: "select",
        options: [
          "normal",
          "having ST-T wave abnormality (T wave inversions and/or ST elevation or depression of > 0.05 mV)",
          "showing probable or definite left ventricular hypertrophy by Estes' criteria",
        ],
        value: "",
      },
      {
        name: "exang",
        label: "Exercise Induced Angina",
        type: "select",
        options: ["yes", "no"],
        value: "",
      },
      {
        name: "oldpeak",
        label: "Oldpeak",
        type: "float",
        value: "",
      },
      {
        name: "slope",
        label: "Slope",
        type: "select",
        options: ["upsloping", "flat", "downsloping"],
        value: "",
      },
      {
        name: "ca",
        label: "Number of Major Vessels",
        type: "select",
        options: ["0", "1", "2", "3"],
        value: "",
      },
      {
        name: "thal",
        label: "Thal",
        type: "select",
        options: ["normal", "fixed defect", "reversable defect"],
        value: "",
      },
      {
        name: "education",
        label: "Education",
        type: "select",
        options: [
          "Less than High School and High School Degrees",
          "College Degree",
          "Master Degree",
          "Phd",
        ],
        value: "",
      },
      {
        name: "cigsPerDay",
        label: "Cigarettes Per Day Consumed",
        type: "int",
        value: "",
      },
      {
        name: "BPMeds",
        label: "BP Meds",
        type: "select",
        options: ["Yes", "No"],
        value: "",
      },
      {
        name: "prevalentStroke",
        label: "Whether or not the patient previously had a stroke",
        type: "select",
        options: ["Yes", "No"],
        value: "",
      },
      {
        name: "prevalentHyp",
        label: "Whether or not the patient was hypertensive",
        type: "select",
        options: ["Yes", "No"],
        value: "",
      },
      {
        name: "diabetes",
        label: "Whether or not the patient had diabetes",
        type: "select",
        options: ["Yes", "No"],
        value: "",
      },
      {
        name: "BMI",
        label: "Body Mass Index",
        type: "float",
        isAutoCalculated: false,
        value: "",
      },
      {
        name: "glucose",
        label: "Glucose Level",
        type: "float",
        value: "",
      },
      {
        name: "cholesterol",
        label: "Cholesterol",
        type: "select",
        options: ["normal", "above normal", "well above normal"],
        value: "",
      },
      {
        name: "alco",
        label: "Alco",
        type: "select",
        options: ["Yes", "No"],
        value: "",
      },
      {
        name: "active",
        label: "Exercise Induced Angina",
        type: "select",
        options: ["Yes", "No"],
        value: "",
      },
      {
        name: "PhysicalHealth",
        label: "Physical Health",
        type: "int",
        value: "",
      },
      {
        name: "MentalHealth",
        label: "Mental Health",
        type: "int",
        value: "",
      },
      {
        name: "DiffWalking",
        label: "Difficulty to Walk or Climbing Stairs",
        type: "select",
        options: ["Yes", "No"],
        value: "",
      },
      {
        name: "Race",
        label: "Race",
        type: "select",
        options: [
          "white",
          "Black",
          "Asian",
          "American Indian/Alaskan Native",
          "Hispanic",
          "Other",
        ],
        value: "",
      },
      {
        name: "SleepTime",
        label: "Total Time in sleeping",
        type: "int",
        value: "",
      },
      {
        name: "Asthma",
        label: "Asthma",
        options: ["Yes", "No"],
        type: "select",
        value: "",
      },
      {
        name: "KidneyDisease",
        label: "Kidney Disease",
        options: ["Yes", "No"],
        type: "select",
        value: "",
      },
      {
        name: "SkinCancer",
        label: "Skin Cancer",
        options: ["Yes", "No"],
        type: "select",
        value: "",
      },
      {
        name: "GenHealth",
        label: "Gen Health",
        options: ["Excellent", "Very good", "Good", "Fair", "Poor"],
        type: "select",
        value: "",
      },
      {
        name: "General_Health",
        label: "General Health",
        options: ["Excellent", "Very good", "Good", "Fair", "Poor"],
        type: "select",
        value: "",
      },
      {
        name: "Checkup",
        label: "Checkup",
        options: [
          "Within the past 2 years",
          "Within the past year",
          "5 or more years ago",
          "Within the past 5 years",
          "Never",
        ],
        type: "select",
        value: "",
      },
      {
        name: "Other_Cancer",
        label: "Any other cancer",
        options: ["Yes", "No"],
        type: "select",
        value: "",
      },
      {
        name: "Depression",
        label: "Feel Depression",
        options: ["Yes", "No"],
        type: "select",
        value: "",
      },
      {
        name: "Arthritis",
        label: "Arthritis",
        options: ["Yes", "No"],
        type: "select",
        value: "",
      },
      {
        name: "Alcohol_Consumption",
        label: "Amoung of Alcohol Consumed",
        type: "float",
        value: "",
      },
      {
        name: "Fruit_Consumption",
        label: "Amoung of Fruit Consumed",
        type: "float",
        value: "",
      },
      {
        name: "Green_Vegetables_Consumption",
        label: "Amoung of Green Vegetables Consumed",
        type: "float",
        value: "",
      },
      {
        name: "FriedPotato_Consumption",
        label: "Amoung of Fried Potatoes Consumed",
        type: "float",
        value: "",
      },
    ],
  });

  useEffect(() => {
    const { height, weight, BMI } = newRecord.recordFeatures.reduce(
      (acc, feature) => {
        if (feature.name === "height") acc.height = feature.value;
        if (feature.name === "weight") acc.weight = feature.value;
        if (feature.name === "BMI") acc.BMI = feature.value;
        return acc;
      },
      {}
    );

    if (height && weight && !BMI) {
      const heightInMeters = height / 100;
      const BMIValue = weight / (heightInMeters * heightInMeters);
      setNewRecord((prev) => ({
        ...prev,
        recordFeatures: prev.recordFeatures.map((feature) =>
          feature.name === "BMI"
            ? { ...feature, value: BMIValue.toString(), isAutoCalculated: true }
            : feature
        ),
      }));
    }
  }, [newRecord]);

  return { newRecord, setNewRecord };
};
