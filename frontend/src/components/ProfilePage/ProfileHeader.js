import { NavLink, Link } from "react-router-dom";
import "./ProfileHeader.css";
import { useSelector } from "react-redux";
import ProfileEditModal from "./ProfileEditModal";
import FriendModal from "../Friends/FriendModal";

function ProfileHeader({ id, user }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <header className="profile-header">
      <div className="cover-photo-container">
        {/* <img alt="cover" src={user.photoUrls && user.photoUrls[1]} /> */}
      </div>
      <div className="profile-details-container">
        <div className="left-profile-details">
          <div className="profile-photo-container">
            {/* <img alt="userLogo" src={user.photoUrls && user.photoUrls[0]}></img> */}
          </div>
          <div className="profile-name-container">
            <h1>{user && user.firstName + " " + user.lastName}</h1>
            <Link id="friend-count" to={`/users/${id}/friends`}>
              3 friends
            </Link>
          </div>
        </div>
        <div className="right-profile-details">
          {user && user.id === sessionUser.id ? (
            <ProfileEditModal user={user} />
          ) : (
            <FriendModal user={user} />
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
