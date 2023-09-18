import React from "react";
import LoginForm from "../LoginForm";
import SignupFormModal from "../SignupForm/index";
import "./Splash.css";

function Splash() {
  return (
    <div className="splash">
      <div className="left">
        <img
          id="fb-logo"
          src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg"
          alt="fblogo"
        />
        <h1>Connect with friends and the world around you on Facebook.</h1>
      </div>

      <div className="right">
        <LoginForm />
        <SignupFormModal />
      </div>
    </div>
  );
}

export default Splash;
