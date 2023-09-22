import { NavLink, Link } from "react-router-dom";
import "./ProfileHeader.css";
import { Modal } from "../../context/Modal";
import { useState } from "react";
import EditProfile from "./EditProfile";

function ProfileHeader({ id, user }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <header className="profile-header">
      <div className="cover-photo-container">
        <img
          src="https://scontent-iad3-1.xx.fbcdn.net/v/t39.30808-6/308942412_10162574519155620_7785633294695839881_n.jpg?stp=cp6_dst-jpg&_nc_cat=109&ccb=1-7&_nc_sid=52f669&_nc_ohc=U3OEYWyDCNYAX9fjaf0&_nc_ht=scontent-iad3-1.xx&oh=00_AfCpFbPZYpfAr9J63DjUeicAWdftnund5LTXlSfHv1OwMg&oe=651005BD"
          alt="cover"
        />
      </div>
      <div className="profile-details-container">
        <div className="left-profile-details">
          <div className="profile-photo-container">
            <img
              alt="userLogo"
              src="https://cdn-icons-png.flaticon.com/512/219/219970.png"
            ></img>
          </div>
          <div className="profile-name-container">
            <h1>{user && user.firstName + " " + user.lastName}</h1>
            <Link id="friend-count" to={`/users/${id}/friends`}>
              3 friends
            </Link>
          </div>
        </div>
        <div className="right-profile-details">
          <div
            className="edit-profile-container"
            onClick={() => {
              setShowModal(true);
            }}
          >
            <div className="edit-icon"></div>
            <button>Edit Profile</button>
          </div>

          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <EditProfile onClose={() => setShowModal(false)} user={user} />
            </Modal>
          )}
        </div>
      </div>
      <div className="profile-links">
        <NavLink
          activeClassName="active-profile-link"
          exact
          to={`/users/${id}`}
        >
          Posts
        </NavLink>
        <NavLink
          activeClassName="active-profile-link"
          to={`/users/${id}/about`}
        >
          About
        </NavLink>
        <NavLink
          activeClassName="active-profile-link"
          to={`/users/${id}/friends`}
        >
          Friends
        </NavLink>
        <NavLink
          activeClassName="active-profile-link"
          to={`/users/${id}/photos`}
        >
          Photos
        </NavLink>
      </div>
    </header>
  );
}

export default ProfileHeader;
