import "./MainFeed.css";
import { useSelector } from "react-redux";
import MainFeedPosts from "../Posts/MainFeedPosts";
import ProfileFriends from "../Friends/ProfileFriends";

function MainFeed() {
  const sessionUser = useSelector((state) => state.session.user);

  if (!sessionUser) return null;

  return (
    <div className="main-feed">
      <div className="right-main-feed">Personal Links</div>

      <MainFeedPosts />

      <div className="friends-section">
        <h2>Friends</h2>
        <ProfileFriends user={sessionUser} />
      </div>
    </div>
  );
}

export default MainFeed;
