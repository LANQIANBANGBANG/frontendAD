import { useState } from "react";

export const CustomFeatureForm = ({ onAddFeature, onCancel }) => {
  const [customFeatureName, setCustomFeatureName] = useState("");
  const [customFeatureValue, setCustomFeatureValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddFeature({
      name: customFeatureName,
      value: customFeatureValue,
      label: customFeatureName,
      type: "text",
    });

    setCustomFeatureName("");
    setCustomFeatureValue("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="customFeatureName">Feature Name</label>
        <input
          type="text"
          id="customFeatureName"
          value={customFeatureName}
          onChange={(e) => setCustomFeatureName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="customFeatureValue">Feature Value</label>
        <input
          type="text"
          id="customFeatureValue"
          value={customFeatureValue}
          onChange={(e) => setCustomFeatureValue(e.target.value)}
          required
        />
      </div>
      <div>
        <button type="submit" onClick={handleSubmit}>
          Submit Custom Feature
        </button>
        <button type="submit" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};
