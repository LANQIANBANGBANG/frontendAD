import sha256 from "js-sha256";

export const GeneratePatientId = (patientName, recordId) => {
  const uuidHash = sha256(recordId).slice(0, 8);

  const uniqueId = (
    "L" + `${uuidHash}-${patientName.replace(/\s/g, "").substring(0, 2)}`
  ).substring(0, 8);
  return uniqueId;
};
