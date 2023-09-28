import { NavLink, Link } from "react-router-dom";
import "./ProfileHeader.css";
import { useSelector, useDispatch } from "react-redux";
import ProfileEditModal from "./ProfileEditModal";
import FriendModal from "../Friends/FriendModal";
import { uploadPhoto } from "../../store/users";

function ProfileHeader({ id, user }) {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  function handleUpload(e) {
    const newPhoto = new FormData();
    newPhoto.append(`user[${e.target.id}]`, e.target.files[0]);
    dispatch(uploadPhoto({ id: sessionUser.id, photo: newPhoto }));
  }

  return (
    <header className="profile-header">
      <div className="cover-photo-container">
        <img alt="cover" src={user && user.coverUrl} />
        {user && sessionUser && user.id === sessionUser.id ? (
          <div className="upload-cover-photo">
            <form className="cover-form">
              <input type="file" id="cover" onChange={(e) => handleUpload(e)} />
            </form>
            <div className="cover-photo-icon"></div>
            Upload Cover Photo
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="profile-details-container">
        <div className="left-profile-details">
          <div className="profile-photo-container">
            <img alt="userLogo" src={user && user.avatarUrl}></img>
            {user && sessionUser && user.id === sessionUser.id ? (
              <div>
                <div className="profile-photo-icon">
                  <form className="upload-form">
                    <input
                      type="file"
                      id="avatar"
                      onChange={(e) => handleUpload(e)}
                    />
                  </form>
                </div>
              </div>
            ) : (
              ""
            )}
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
