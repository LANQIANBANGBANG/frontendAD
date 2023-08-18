import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div>
      <div className="my-5">
        <footer className="container-fluid bg-color text-center text-lg-start text-color">
          <div className="p-4 pb-0">
            <section className="container ">
              <div className="row ">
                <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
                  <h3 className="text-uppercase text-color2">
                    TEAM 2<br />
                    HOSPITAL
                  </h3>
                  <br />
                  <p>
                    Leading the Way in Medical Resarch
                    <br />
                    Integration between Technology and Healthcare
                    <br />
                    Execellence, Trusted Care.
                  </p>
                </div>

                <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
                  <h6 className="text-uppercase text-color-4">Articles</h6>

                  <ul className="text-color2 list-unstyled mb-0">
                    <br></br>
                    <li>HealthCare</li>
                    <li>Research</li>
                    <li>Services</li>
                  </ul>
                </div>

                <div className="col-lg-3 col-md-7 mb-4 mb-md-0">
                  <h6 className="text-uppercase text-color-4">Social Media</h6>

                  <ul className="list-unstyled mb-0">
                    <li>
                      <br></br>
                      Instagram
                    </li>
                  </ul>
                </div>

                <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
                  <h6 className="text-uppercase text-color-4">Careers</h6>

                  <ul className="text-color2 list-unstyled mb-0">
                    <br></br>
                    <Link to="/contact-us">Contact Us</Link>

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
            © 2023 All Rights Reserved by SA 56 Team 2
          </div>
        </footer>
      </div>
    </div>
  );
};
