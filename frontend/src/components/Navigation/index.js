import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./Navigation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function Navigation() {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="navBarContainer">
      <div className="leftNavBarContainer">
        <nav>
          <NavLink to="/">
            <img
              id="fbLogo"
              alt="fbLogo"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/2048px-2021_Facebook_icon.svg.png"
            ></img>
          </NavLink>
          <div>
            {" "}
            <FontAwesomeIcon id="magnify-icon" icon={faMagnifyingGlass} />
            <input id="userSearch" placeholder="Search Facespace" type="text" />
          </div>
        </nav>
      </div>

      <div className="centerNavBarContainer">
        <nav>
          <NavLink to="/">
            <FontAwesomeIcon
              id="homepage-icon"
              icon={faHouse}
              style={{ color: "#1b74e4" }}
            />
          </NavLink>
        </nav>
      </div>

      <div className="rightNavBarContainer">
        <nav>
          <NavLink to="/">
            <img
              id="userLogo"
              alt="userLogo"
              src="https://cdn-icons-png.flaticon.com/512/219/219970.png"
            ></img>
          </NavLink>
        </nav>
      </div>
    </div>
  );
}

export default Navigation;
