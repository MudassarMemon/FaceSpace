import { NavLink, Link } from "react-router-dom";
import "./ProfileHeader.css";
import { Modal } from "../../context/Modal";
import { useState } from "react";
import ProfileEditForm from "./ProfileEditForm";

function ProfileHeader({ id, user }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <header className="profile-header">
      <div className="cover-photo-container">
        <img alt="cover" src={user && user.coverPicUrl} />
      </div>
      <div className="profile-details-container">
        <div className="left-profile-details">
          <div className="profile-photo-container">
            <img alt="userLogo" src={user && user.profilePicUrl}></img>
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
              <ProfileEditForm
                onClose={() => setShowModal(false)}
                user={user}
              />
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
