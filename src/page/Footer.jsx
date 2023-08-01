import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div>
      <div class="container my-5">
        <footer class="text-center text-lg-start text-color">
          <div class="container-fluid p-4 pb-0">
            <section class="">
              <div class="row">
                <div class="col-lg-4 col-md-6 mb-4 mb-md-0">
                  <h5 class="text-uppercase text-color">
                    Team 2 Hospital System
                  </h5>

                  <p>This is team 2's project. This is team 2's project.</p>
                  <p>This is team 2's project. This is team 2's project.</p>
                  <p>This is team 2's project. This is team 2's project.</p>
                  <p>This is team 2's project. This is team 2's project.</p>
                  <p>This is team 2's project. This is team 2's project.</p>
                </div>

                <div class="col-lg-2 col-md-6 mb-4 mb-md-0">
                  <h5 class="text-uppercase text-color-4">Articles</h5>

                  <ul class="list-unstyled mb-0">
                    <li>
                      <a href="#!" class="text-color">
                        Link 1
                      </a>
                    </li>
                  </ul>
                </div>

                <div class="col-lg-3 col-md-7 mb-4 mb-md-0">
                  <h5 class="text-uppercase text-color-4">Our Social Media</h5>

                  <ul class="list-unstyled mb-0">
                    <li>
                      <a href="#!" class="text-color">
                        Installgram
                      </a>
                    </li>
                  </ul>
                </div>

                <div class="col-lg-2 col-md-6 mb-4 mb-md-0">
                  <h5 class="text-uppercase text-color-4">Careers</h5>

                  <ul class="list-unstyled mb-0">
                    <li>
                      <a href="#!" class="text-color">
                        Link 1
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <hr class="mb-4" />
          </div>

          <div class="text-center">
            © 2023 Copyright:
            <a
              class="text-color-3"
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
