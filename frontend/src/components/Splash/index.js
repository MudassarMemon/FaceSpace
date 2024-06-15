import React from "react";
import LoginForm from "../LoginForm/index.js";
import SignupFormModal from "../SignupForm/index";
import "./Splash.css";
import { rubySvg ,reactSvg } from "../../assets/splash_logos.js";

function Splash() {
  return (
    <>
      <div className="splash-container">
        <div className="splash-wrapper">
          <div className="left">
            <div className="logo-wrapper">
              <img
                id="officebook-logo"
                src="https://facespace-fs-seeds.s3.amazonaws.com/TheOfficeBookLogo.png"
                alt="officebook-logo"
              />
              <h2>
                Built this neat app in 2 weeks with Ruby <span>{rubySvg()}</span> & React <span>{reactSvg()}</span>
              </h2>
            </div>
          </div>

          <div className="right">
            <div className="login-form-wrapper">
              <LoginForm />
              <SignupFormModal />
            </div>
          </div>
        </div>
      </div>
      <footer>
        <a href="https://mudassarmemon-3xhow.ondigitalocean.app/" target="_blank">Mudassar Memon</a>
        <a
          href="https://www.linkedin.com/in/mudassar-memon-0a48b1125/"
          target="_blank"
        >
          <i className="fa-brands fa-linkedin"></i> LinkedIn
        </a>
        <a href="https://github.com/MudassarMemon" target="_blank">
          <i className="fa-brands fa-github"></i> GitHub
        </a>
        <a href="https://github.com/MudassarMemon/Facespace" target="_blank">
          <img alt="" id="officebook-git-logo" src="https://facespace-fs-seeds.s3.amazonaws.com/TheOfficeBookFavicon.png"/>Officebook Repo
        </a>
      </footer>
    </>
  );
}

export default Splash;
