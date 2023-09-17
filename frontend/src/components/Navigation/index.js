import React from "react";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import LoginForm from "../LoginForm";
import SignupFormModal from "../SignupFormPage";

function Navigation() {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <div className="login-create-user">
        <div>
          <img
            src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg"
            alt="fblogo"
          />
          <h1>Connect with friends and the world around you on Facebook.</h1>
        </div>

        <div>
          <LoginForm />
          <SignupFormModal />
        </div>
      </div>
    );
  }

  return (
    <ul>
      <li>{sessionLinks}</li>
    </ul>
  );
}

export default Navigation;
