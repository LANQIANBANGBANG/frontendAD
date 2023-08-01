import AdminHeader from "./AdminHeader";
import NormalHeader from "./NormalHeader";
import { DoctorHeader } from "./DoctorHeader";

export const RoleNav = () => {
  // const doctor = JSON.parse(sessionStorage.getItem("active-doctor"));
  // const admin = JSON.parse(sessionStorage.getItem("active-admin"));

  // if (admin != null) {
  //   return <AdminHeader />;
  // } else if (doctor != null) {
  //   return <DoctorHeader />;
  // } else {
  //   return <NormalHeader />;
  // }
  return <DoctorHeader />;
};
