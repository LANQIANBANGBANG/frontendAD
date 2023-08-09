import AdminHeader from "./AdminHeader";
import NormalHeader from "./NormalHeader";
import { DoctorHeader } from "./DoctorHeader";
import { ResearcherHeader } from "./ResearcherHeader";

export const RoleNav = () => {
  const doctor = JSON.parse(sessionStorage.getItem("active-doctor"));
  const admin = JSON.parse(sessionStorage.getItem("active-admin"));
  const researcher = JSON.parse(sessionStorage.getItem("active-researcher"));

  if (admin != null) {
    return <AdminHeader />;
  } else if (doctor != null) {
    return <DoctorHeader />;
  } else if (researcher != null) {
    return <ResearcherHeader />;
  } else {
    return <NormalHeader />;
  }
};
