import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { GENDERS, SPECIALISTS } from "../utils/Constant";
import { USER_API_URL } from "../config/config";

export const DoctorEdit = () => {
  const { id: doctorId } = useParams();
  const [doctor, setDoctor] = useState({
    id: doctorId,
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    phone: "",
    role: "",
    age: "",
    gender: "",
    specialist: "",
    role: "DOCTOR",
  });

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const response = await axios.get(`${USER_API_URL}/${doctorId}`);
        const doctorData = response.data.data.user;
        console.log("fetchresponse: " + JSON.stringify(doctorData));
        setDoctor(doctorData);
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };

    fetchDoctorData();
  }, [doctorId]);

  const handleUserInput = (event) => {
    const { name, value } = event.target;

    setDoctor({ ...doctor, [name]: value });
  };

  const updateDoctor = async (event) => {
    event.preventDefault();
    console.log(doctor);

    try {
      const response = await axios.put(`${USER_API_URL}`, doctor);
      if (response.data.success) {
        toast.success("Doctor Updated Successfully!!!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setDoctor({
          id: doctorId,
          firstName: "",
          lastName: "",
          emailId: "",
          password: "",
          phone: "",
          role: "",
          age: "",
          gender: "",
          specialist: "",
          role: "DOCTOR",
        });
      }
    } catch (error) {
      toast.error("Update Failed. Please Try Again!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div>
      <div className="mt-2 d-flex aligns-items-center justify-content-center ms-2 me-2 mb-2">
        <div
          className="card form-card border-color text-color custom-bg"
          style={{ width: "50rem" }}
        >
          <div className="card-header bg-color custom-bg-text text-center">
            <h5 className="card-title">Edit Doctor</h5>
          </div>
          <div className="card-body">
            <form className="row g-3" onSubmit={updateDoctor}>
              <div className="col-md-6 mb-3 text-color">
                <label htmlFor="title" className="form-label">
                  <b> First Name</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  onChange={handleUserInput}
                  value={doctor.firstName}
                />
              </div>
              <div className="col-md-6 mb-3 text-color">
                <label htmlFor="description" className="form-label">
                  <b>Last Name</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  onChange={handleUserInput}
                  value={doctor.lastName}
                />
              </div>

              <div className="col-md-6 mb-3 text-color">
                <b>
                  <label className="form-label">Email Id</label>
                </b>
                <input
                  type="email"
                  className="form-control"
                  id="emailId"
                  name="emailId"
                  onChange={handleUserInput}
                  value={doctor.emailId}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="quantity" className="form-label">
                  <b>Password</b>
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  onChange={handleUserInput}
                  value={doctor.password}
                />
              </div>

              <div className="col-md-6 mb-3 text-color">
                <label htmlFor="sex" className="form-label">
                  <b>User Gender</b>
                </label>
                <select
                  onChange={handleUserInput}
                  className="form-control"
                  name="gender"
                  value={doctor.gender}
                >
                  <option value="0">Select Gender</option>

                  {Object.values(GENDERS).map((gender) => {
                    return (
                      <option key={gender} value={gender}>
                        {gender}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="col-md-6 mb-3 text-color">
                <label htmlFor="bloodGroup" className="form-label">
                  <b>Specialist</b>
                </label>
                <select
                  onChange={handleUserInput}
                  className="form-control"
                  name="specialist"
                  value={doctor.specialist}
                >
                  <option value="0">Select Specialist</option>

                  {Object.values(SPECIALISTS).map((s) => {
                    return (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="phone" className="form-label">
                  <b>Phone No</b>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="phone"
                  name="phone"
                  onChange={handleUserInput}
                  value={doctor.phone}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="age" className="form-label">
                  <b>Age</b>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="age"
                  name="age"
                  onChange={handleUserInput}
                  value={doctor.age}
                />
              </div>

              <div className="d-flex aligns-items-center justify-content-center">
                <input
                  type="submit"
                  className="btn bg-color custom-bg-text"
                  value="Update Doctor"
                />
              </div>

              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};