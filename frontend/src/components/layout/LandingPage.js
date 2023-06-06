import React, { useEffect, Fragment } from "react";
import "animate.css";
import { Link } from "react-router-dom";
import "./LandingPage.css";
import { Carousel } from "react-bootstrap";
import "animate.css";

function LandingPage() {
  useEffect(() => {
    window.onload = function () {
      window.scrollTo(0, 0);
    };
  }, []);

  return (
    <Fragment>
      {/* <div>
            <Carousel pause="hover">
                 
                 <Carousel.Item className="carousel">
                  <div className="landingPageSlider">
                     <img className="landingPageSliderImg" src="./images/slider1.jpg" />
                  </div>
             </Carousel.Item>

             </Carousel>
        </div> */}

      <div className="container">
        <div className="landingPageCards">
          <div className="landingPageCard animate__animated animate__fadeInLeft">
            <div className="landingBackground"></div>
            <span className="landingCardTitle">Food</span>
            <div className="landingPageButton">
              <Link to="/foods" style={{ textDecoration: "none" }}>
                <button>Go to store</button>
              </Link>
            </div>
          </div>
          {/* link to =/home */}

          <div className="landingPageCard animate__animated animate__fadeInUp">
            <div className="landingBackground2"></div>

            <span className="landingCardTitle">Drinks</span>
            <div className="landingPageButton">
              <Link to="/drinks" style={{ textDecoration: "none" }}>
                <button>Go to store</button>
              </Link>
            </div>
          </div>

          <div className="landingPageCard animate__animated animate__fadeInUp">
            <div className="landingBackground3"></div>
            <span className="landingCardTitle">Toppings</span>
            <div className="landingPageButton">
              <Link to="/toppings" style={{ textDecoration: "none" }}>
                <button>Go to store</button>
              </Link>
            </div>
          </div>

          <div className="landingPageCard animate__animated animate__fadeInUp">
            <div className="landingBackground5"></div>
            <span className="landingCardTitle">PeacePark</span>
            <div className="landingPageButton">
              <Link to="/peacePark" style={{ textDecoration: "none" }}>
                <button>Go to store</button>
              </Link>
            </div>
          </div>

          <div className="landingPageCard animate__animated animate__fadeInUp">
            <div className="landingBackground4"></div>
            <span className="landingCardTitle">RUNSA WEEK</span>
            <div className="landingPageButton">
              <Link to="" style={{ textDecoration: "none" }}>
                <button disabled={true}>Coming Soon</button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* <section className="descSection">
           <Carousel pause="hover">
                 
                    <Carousel.Item className="carousel">
                     <div className="description">
                        <img src="./images/undraw_takeout_boxes_ap54.svg" />
                        <p>Fast delivery</p>
                     </div>
                     <div className="description">
                        <img src="./images/undraw_takeout_boxes_ap54.svg" />
                        <p>Fast delivery</p>
                     </div>
                </Carousel.Item>
                   
                    <Carousel.Item>
                     <div className="description">
                        <img src="./images/undraw_takeout_boxes_ap54.svg" />
                        <p>Fast delivery</p>
                     </div>
                </Carousel.Item>
                    <Carousel.Item>
                     <div className="description">
                        <img src="./images/undraw_takeout_boxes_ap54.svg" />
                        <p>Fast delivery</p>
                     </div>
                </Carousel.Item>
                    
                </Carousel>
           </section> */}

      {/* <div className="landingPage">
                        <div className="landingText animate__animated animate__fadeInLeft">
                            <h3>Welcome to</h3>
                            <h1>RunOrder</h1>
                            <span>An ordering service ready to serve you better</span>
                            <Link to={"/home"} > <button type="button" className="btn btn btn-primary btn-lg button1"> Go to Store</button></Link>

                        </div>
                        <div className=" landingImage mt-5 animate__animated animate__fadeIn">
                            <img className="img-fluid" src="./images/undraw_shopping_app_flsj.svg" alt="" />
                        </div>
                    </div> */}
    </Fragment>
  );
}

export default LandingPage;
