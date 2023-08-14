import "./App.css";
import React from "react";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Header from "./NavbarComponent/Header";
import { ContactUs } from "./page/ContactUs";
import { HomePage } from "./page/HomePage";
import UserLoginForm from "./UserComponent/UserLoginForm";
import ViewAllDoctor from "./UserComponent/ViewAllDoctor";
import DoctorRegister from "./UserComponent/DoctorRegister";
import { DoctorEdit } from "./UserComponent/DoctorEdit";
import { ViewAllMedicalRecord } from "./UserComponent/ViewAllMedicalRecord";
import { FeaturesForm } from "./UserComponent/FeaturesForm";
import { AddMedicalRecordPage } from "./UserComponent/AddMedicalRecordPage";
import { ViewAllReport } from "./ReportComponent/ViewAllReport";
import { CustomFeaturesPage } from "./UserComponent/CustomFeaturesPage";
import { ViewAllResearcher } from "./UserComponent/Researcher/ViewAllResearcher";
import { ResearcherRegister } from "./UserComponent/Researcher/ResearcherRegister";
import { ResearcherEdit } from "./UserComponent/Researcher/ResearcherEdit";

export function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/about" element={<ContactUs />} />
        <Route path="/user/login" element={<UserLoginForm />} />
        <Route path="/user/doctor/all" element={<ViewAllDoctor />} />
        <Route path="user/researcher/all" element={<ViewAllResearcher />} />
        <Route path="/user/doctor/register" element={<DoctorRegister />} />
        <Route
          path="/user/researcher/register"
          element={<ResearcherRegister />}
        />
        <Route path="/user/doctor/update/:id" element={<DoctorEdit />} />
        <Route
          path="/user/researcher/update/:id"
          element={<ResearcherEdit />}
        />
        <Route path="/record/all" element={<ViewAllMedicalRecord />} />
        <Route path="/record/features/:recordId" element={<FeaturesForm />} />
        <Route path="/add-medical-record" element={<AddMedicalRecordPage />} />
        <Route path="/report/all" element={<ViewAllReport />} />
        <Route
          path="/custom-features/:recordId"
          element={<CustomFeaturesPage />}
        />
      </Routes>
    </>
  );
}
