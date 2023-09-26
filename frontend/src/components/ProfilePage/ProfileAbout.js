import ProfileIntro from "./ProfileIntro";
import "./ProfileAbout.css";

function ProfileAbout({ user }) {
  return (
    <div className="profile-about-container">
      <ProfileIntro user={user} />
    </div>
  );
}

export default ProfileAbout;
