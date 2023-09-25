import "./ProfileFeed.css";
import ProfilePosts from "../Posts/ProfilePosts";

function ProfileFeed({ user }) {
  return (
    <>
      <div className="profile-left-container">
        <div className="profile-bio-container">
          <h2>Bio</h2>
          {user ? user.bio : ""}
        </div>
        <div className="profile-friends-container">
          <h2>Friends</h2>
        </div>
        <div className="profile-photos-container">
          <h2>Photos</h2>
        </div>
      </div>

      <div className="profile-right-container">
        <ProfilePosts user={user} />
      </div>
    </>
  );
}

export default ProfileFeed;
