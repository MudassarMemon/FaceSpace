import { formatDateShorter } from "../Util/DateUtil";
import { useSelector } from "react-redux";
import ProfileEditModal from "./ProfileEditModal";
import "./ProfileIntro.css";

function ProfileIntro({ user }) {
  const sessionUser = useSelector((state) => state.session.user);
  if (!user) return null;

  const editIntroModal = () => {
    if (user.id === sessionUser.id) {
      return <ProfileEditModal user={user} buttonName="Edit Intro" />;
    } else {
      return null;
    }
  };

  return (
    <div className="intro-container">
      <div className="profile-bio-container">
        <h2>Intro</h2>
        {user.bio ? user.bio : editIntroModal()}
      </div>
      <div className="profile-workplace-container">
        {user.workplace ? (
          <div>
            <img
              alt=""
              src="https://static.xx.fbcdn.net/rsrc.php/v3/yX/r/s_ONRClAxbX.png"
            />
            {"Works at " + user.workplace}
          </div>
        ) : null}
      </div>

      <div className="profile-school-container">
        {user.school ? (
          <div>
            <img
              alt=""
              src="https://static.xx.fbcdn.net/rsrc.php/v3/yG/r/H804hWf2rBh.png"
            />
            {"Studied at " + user.school}
          </div>
        ) : null}
      </div>

      <div className="profile-currentCity-container">
        {user.currentCity ? (
          <div>
            <img
              alt=""
              src="https://static.xx.fbcdn.net/rsrc.php/v3/y3/r/Yifeo6sHdtL.png"
            />
            {"Lives in " + user.currentCity}
          </div>
        ) : null}
      </div>
      <div className="profile-hometown-container">
        {user.hometown ? (
          <div>
            <img
              alt=""
              src="https://static.xx.fbcdn.net/rsrc.php/v3/yK/r/dkccKhK21Su.png"
            />
            {"From " + user.hometown}
          </div>
        ) : null}
      </div>
      <div className="profile-pronunciation-container">
        {user.pronunciation ? (
          <div>
            <img
              alt=""
              src="https://static.xx.fbcdn.net/rsrc.php/v3/yU/r/_uvQyqmWMnV.png"
            />
            {"Pronounces name " + user.pronunciation}
          </div>
        ) : null}
      </div>
      <div className="profile-createdAt-container">
        {user ? (
          <div>
            <img
              alt=""
              src="https://static.xx.fbcdn.net/rsrc.php/v3/y-/r/DqqZwK6dixD.png"
            />
            {"Joined " + formatDateShorter(user.createdAt)}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ProfileIntro;
