import "./MainFeed.css";
import { useSelector } from "react-redux";
import MainFeedPosts from "../Posts/MainFeedPosts";
import MainFeedFriends from "../Friends/MainFeedFriends";
import DeveloperLinks from "./DeveloperLinks";

function MainFeed() {
  const sessionUser = useSelector((state) => state.session.user);

  if (!sessionUser) return null;

  return (
    <div className="main-feed">
      <DeveloperLinks />

      <MainFeedPosts />

      <div className="friends-section">
        <h2>Friends</h2>
        <MainFeedFriends user={sessionUser} />
      </div>
    </div>
  );
}

export default MainFeed;
