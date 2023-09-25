import "./ProfileFeed.css";
import ProfilePosts from "../Posts/ProfilePosts";
import ProfileIntro from "./ProfileIntro";

function ProfileFeed({ user }) {
  return (
    <>
      <div className="profile-left-container">
        <ProfileIntro user={user} />
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
