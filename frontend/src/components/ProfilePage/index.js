import { useEffect } from "react";
import { useParams, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, fetchUser } from "../../store/users";
import { getPosts, receivePosts } from "../../store/posts";
import UserFeed from "./UserFeed";
import UserAbout from "./UserAbout";
import ProfileHeader from "./ProfileHeader";

import "./ProfilePage.css";

function ProfilePage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(getUser(id));
  const userPosts = useSelector(getPosts);

  useEffect(() => {
    dispatch(fetchUser(id)).then((res) => dispatch(receivePosts(res)));
  }, [id, dispatch]);

  return (
    <>
      <ProfileHeader user={user} id={id} />
      <div className="profile-main-container">
        <Route exact path="/users/:id">
          <UserFeed posts={userPosts} user={user} />
        </Route>
        <Route path="/users/:id/about">
          <UserAbout user={user} />
        </Route>
        <Route path="/users/:id/friends"></Route>
        <Route path="/users/:id/photos"></Route>
      </div>
    </>
  );
}

export default ProfilePage;
