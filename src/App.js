import "./App.css";
import React from "react";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Header from "./NavbarComponent/Header";
import { ContactUs } from "./page/ContactUs";
import { HomePage } from "./page/HomePage";
import UserLoginForm from "./UserComponent/UserLoginForm";
import ViewAllDoctor from "./UserComponent/ViewAllDoctor";
import { DoctorEdit } from "./UserComponent/DoctorEdit";
import { ViewAllMedicalRecord } from "./UserComponent/ViewAllMedicalRecord";
import { FeaturesForm } from "./UserComponent/FeaturesForm";
import { AddMedicalRecordPage } from "./UserComponent/AddMedicalRecordPage";
import { CustomFeaturesPage } from "./UserComponent/CustomFeaturesPage";
import { ViewAllUser } from "./UserComponent/Researcher/ViewAllUser";
import { UserRegister } from "./UserComponent/Researcher/UserRegister";
import { UserEdit } from "./UserComponent/Researcher/UserEdit";

export function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/about" element={<ContactUs />} />
        <Route path="/user/login" element={<UserLoginForm />} />
        <Route path="/user/doctor/all" element={<ViewAllDoctor />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route
          path="/user/nurse/all"
          element={<ViewAllUser userType="NURSE" />}
        />
        <Route
          path="user/researcher/all"
          element={<ViewAllUser userType="RESEARCHER" />}
        />
        <Route path="/user/:userType/register" element={<UserRegister />} />
        <Route path="/user/doctor/update/:id" element={<DoctorEdit />} />
        <Route path="/user/:userType/update/:userId" element={<UserEdit />} />

        <Route path="/record/all" element={<ViewAllMedicalRecord />} />
        <Route path="/record/features/:recordId" element={<FeaturesForm />} />
        <Route path="/add-medical-record" element={<AddMedicalRecordPage />} />
        <Route
          path="/custom-features/:recordId"
          element={<CustomFeaturesPage />}
        />
      </Routes>
    </>
  );
}
