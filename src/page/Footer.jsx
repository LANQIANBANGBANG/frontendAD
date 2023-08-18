import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div>
      <div className="container my-5">
        <footer className="text-center text-lg-start text-color">
          <div className="container-fluid p-4 pb-0">
            <section className="">
              <div className="row">
                <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
                  <h5 className="text-uppercase text-color">
                    Team 2 Hospital System
                  </h5>

                  <p>This is team 2's project. This is team 2's project.</p>
                  <p>This is team 2's project. This is team 2's project.</p>
                  <p>This is team 2's project. This is team 2's project.</p>
                  <p>This is team 2's project. This is team 2's project.</p>
                  <p>This is team 2's project. This is team 2's project.</p>
                </div>

                <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
                  <h5 className="text-uppercase text-color-4">Articles</h5>

                  <ul className="list-unstyled mb-0">
                    <li>
                      <a href="#!" className="text-color">
                        Link 1
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="col-lg-3 col-md-7 mb-4 mb-md-0">
                  <h5 className="text-uppercase text-color-4">Our Social Media</h5>

                  <ul className="list-unstyled mb-0">
                    <li>
                        Instagram
                    </li>
                  </ul>
                </div>

                <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
                  <h5 className="text-uppercase text-color-4">Careers</h5>

                  <ul className="list-unstyled mb-0">
                    <li>
                      <a href="#!" className="text-color">
                        Link 1
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <hr className="mb-4" />
          </div>

          <div className="text-center">
            © 2023 Copyright:
            <a
              className="text-color-3"
              href="https://www.nuh.com.sg/Pages/Home.aspx"
            >
              National University Hospital
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};
