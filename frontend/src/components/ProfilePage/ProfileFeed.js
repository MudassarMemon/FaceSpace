import "./ProfileFeed.css";
import ProfilePosts from "../Posts/ProfilePosts";
import ProfileIntro from "./ProfileIntro";
import ProfileFriends from "../Friends/ProfileFriends";
import { Link } from "react-router-dom";

function ProfileFeed({ user }) {
  return (
    <>
      <div className="profile-left-container">
        <ProfileIntro user={user} />
        <div className="profile-friends-container">
          <div>
            <Link to={`/users/${user?.id}/friends`}>
              <h2>Friends</h2>
            </Link>
          </div>
          <ProfileFriends user={user} />
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
