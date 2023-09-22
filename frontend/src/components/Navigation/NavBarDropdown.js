import { NavLink } from "react-router-dom";
import "./NavBarDropdown.css";

function NavBarDropdown({ sessionUser, logout, onClose }) {
  return (
    <div className="nav-bar-dropdown">
      <div className="profile-link" onClick={onClose}>
        <NavLink
          id="profile-link"
          style={{ textDecoration: "none" }}
          to={`/users/${sessionUser.id}`}
        >
          <h1>{sessionUser.firstName + " " + sessionUser.lastName}</h1>
        </NavLink>
      </div>
      <div onClick={logout} className="logout-container">
        <div className="logout-icon"></div>
        <button>Log Out</button>
      </div>
    </div>
  );
}

export default NavBarDropdown;
