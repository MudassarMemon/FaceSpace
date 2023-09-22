import { NavLink } from "react-router-dom";
import "./NavBarDropdown.css";

function NavBarDropdown({ sessionUser, Logout }) {
  return (
    <div className="nav-bar-dropdown">
      <div className="profile-link">
        <NavLink
          style={{ textDecoration: "none" }}
          to={`/users/${sessionUser.id}`}
        >
          <h1>{sessionUser.firstName + " " + sessionUser.lastName}</h1>
        </NavLink>
      </div>
      <div className="logout-container">
        <div className="logout-button"></div>
        <button onClick={Logout}>Log Out</button>
      </div>
    </div>
  );
}

export default NavBarDropdown;
