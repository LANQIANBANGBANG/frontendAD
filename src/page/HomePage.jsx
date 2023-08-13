import React from "react";
import { Footer } from "./Footer";
import { Carousel } from "./Carousel";
import { useState, useEffect } from "react";
import axios from "axios";

export const HomePage = () => {
  const [allDoctor, setAllDoctor] = useState([]);

  //需要展示医生的图片,链接需要改一下
  // const retrieveAllDoctor = async () => {
  //   const response = await axios.get("http://localhost:8080/api/doctor/all");
  //   return response.data;
  // };

  // useEffect(() => {
  //   const getAllDoctor = async () => {
  //     const allDoctor = await retrieveAllDoctor();
  //     if (allDoctor) {
  //       setAllDoctor(allDoctor);
  //     }
  //   };
  //   getAllDoctor();
  // }, []);

  return (
    <div className="container-fluid mb-2">
      <Carousel />
      <div className="mt-2 mb-5">
        <div className="row">
          <div className="col-md-12">
            <div className="row row-cols-1 row-cols-md-5 g-3">
              {/* {allDoctor.map((doctor) => {
                return <DoctorCard item={doctor} />;
              // })} */}
              {/* 把每一个医生放到那个图片里 */}
            </div>
          </div>
        </div>
      </div>
      <hr />
      <Footer />
    </div>
  );
};
