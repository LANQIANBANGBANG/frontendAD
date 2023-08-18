import React from "react";
import { Footer } from "./PageComponent/Footer";
import { Carousel } from "./PageComponent/Carousel";

export const HomePage = () => {
  return (
    <div className="container-fluid mb-2">
      <Carousel />
      <br></br>
      <div className="text-center mt-2 mb-5">
        <h6 className="text-color1">
          <b>WELCOME TO TEAM 2 HOSPITAL</b>
        </h6>
        <br></br>
        <h3 className="text-color">AI Age of New Health Care Solutions</h3>
        <br></br>
        <div className="text-black container text-center">
          <p>
            Machine learning is revolutionizing disease prediction by analyzing
            extensive medical data to uncover hidden patterns. These algorithms
            predict diseases, from common ailments to rare disorders, with
            remarkable accuracy. This early detection enables timely
            intervention and optimal resource allocation, transforming
            healthcare from reactive to proactive. By leveraging machine
            learning's potential, healthcare becomes more effective in managing
            public health and improving patient outcomes.
          </p>
        </div>
      </div>

      <div className="mt-2 mb-5"></div>
      <Footer to="./Footer" />
    </div>
  );
};
