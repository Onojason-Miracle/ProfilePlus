import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <header id="wrapper">
        <section id="hero-page">
          <div className="image-container">
            <div className="phone-frame">
              <img
                src="https://res.cloudinary.com/blackgirlmagic/image/upload/v1744022078/profilePlus/ChatGPT_Image_Apr_7_2025_11_15_49_AM_d4po7a.png"
                alt="hero page 2"
                className="phone-image"
              />
            </div>
          </div>

          <div className="text">
            <div>
              <h1 className="welcome-hero-text">Welcome to ProfilePlus!</h1>
              <p>Your Digital Identity, Simplified.</p>
            </div>

            <div className="hero-div1">
              <p className="welcome-hero-text1">
                Create a stunning online profile in minutes. No hassle, just
                beautiful results!
              </p>

              <p>
                Effortlessly create a personalized profile that showcases your
                unique identity. Simply fill out our easy-to-use form and watch
                your digital presence soar.
              </p>
            </div>

            <div className="hero-div2">
              <Link className="btn-a" to="/register">
                <button className="heroBtn">Get Started</button>
              </Link>
            </div>
          </div>
        </section>

        {/* <Footer /> */}
      </header>
    </>
  );
}

export default Home;
