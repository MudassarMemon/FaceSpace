import React from "react";
import LoginForm from "../LoginForm";
import SignupFormModal from "../SignupForm/index";
import "./Splash.css";

function Splash() {
  return (
    <>
      <div className="splashContainer">
        <div className="splashContentContainer">
          <div className="left">
            <div className="logoContainer">
              <img
                id="fb-logo"
                src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg"
                alt="fblogo"
              />
            </div>
            <h2>Connect with friends and the world around you on Facebook.</h2>
          </div>

          <div className="right">
            <LoginForm />
            <SignupFormModal />
          </div>
        </div>
      </div>
      <footer>Footer</footer>
    </>
  );
}

export default Splash;
