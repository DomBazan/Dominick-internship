import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import SubHeader from "../images/subheader.jpg";
import ExploreItems from "../components/explore/ExploreItems";

const Explore = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="subheader"
          className="text-light"
          style={{ background: `url("${SubHeader}") top` }}
          data-aos="fade-up"
        >
          <div className="center-y relative text-center">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center">
                  <h1>Explore</h1>
                </div>
                <div className="clearfix"></div>
              </div>
            </div>
          </div>
        </section>

        <section aria-label="section" data-aos="fade-up">
          <div className="container">
            <div className="row">
              <ExploreItems />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Explore;
