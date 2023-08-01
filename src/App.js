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

export function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/user/login" element={<UserLoginForm />} />
        <Route path="/user/doctor/all" element={<ViewAllDoctor />} />
        <Route path="/user/doctor/register" element={<DoctorRegister />} />
        <Route path="/user/doctor/update/:id" element={<DoctorEdit />} />
        <Route path="/record/all" element={<ViewAllMedicalRecord />} />
        <Route path="/record/features/:recordId" element={<FeaturesForm />} />
      </Routes>
    </>
  );
}
