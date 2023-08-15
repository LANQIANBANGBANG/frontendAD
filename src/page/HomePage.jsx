import React from "react";
import { Footer } from "./Footer";
import { Carousel } from "./Carousel";
import { useState, useEffect } from "react";
import axios from "axios";

export const HomePage = () => {
  return (
    <div className="container-fluid mb-2">
      <Carousel />
      <div className="mt-2 mb-5">
        <div className="row">
          <div className="col-md-12">
            <div className="row row-cols-1 row-cols-md-5 g-3"></div>
          </div>
        </div>
      </div>
      <hr />
      <Footer />
    </div>
  );
};
