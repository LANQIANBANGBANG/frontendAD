import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { GENDERS, SPECIALISTS } from "../utils/Constant";

export const DoctorEdit = () => {
  const { id: doctorId } = useParams();
  const [doctor, setDoctor] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    phone: "",
    role: "",
    age: "",
    gender: "",
    specialist: "",
  });

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/doctor/${doctorId}`
        );
        const doctorData = response.data;
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

  const updateDoctor = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("firstName", doctor.firstName);
    formData.append("lastName", doctor.lastName);
    formData.append("emailId", doctor.emailId);
    formData.append("password", doctor.password);
    formData.append("phone", doctor.phone);
    formData.append("role", doctor.role);
    formData.append("age", doctor.age);
    formData.append("gender", doctor.gender);
    formData.append("specialist", doctor.specialist);

    axios
      .post("http://localhost:8080/api/doctor/register", formData)
      .then((result) => {
        result.json().then((res) => {
          console.log(res);
          toast.success("Doctor Registered Successfully!!!", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
      });
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
                  name="sex"
                >
                  <option value="0">Select Gender</option>

                  {GENDERS.map((gender) => {
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
                >
                  <option value="">Select Specialist</option>

                  {SPECIALISTS.map((s) => {
                    return (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="contact" className="form-label">
                  <b>Contact No</b>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="contact"
                  name="contact"
                  onChange={handleUserInput}
                  value={doctor.contact}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="contact" className="form-label">
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
