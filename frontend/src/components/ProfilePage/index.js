import { useEffect } from "react";
import { useParams, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, getUsers, fetchUser, fetchUsers } from "../../store/users";
import ProfileFeed from "./ProfileFeed";
import ProfileAbout from "./ProfileAbout";
import ProfileHeader from "./ProfileHeader";
import ProfileFriends from "../Friends/ProfileFriends";
import "./ProfilePage.css";

function ProfilePage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(getUser(id));
  const users = useSelector(getUsers);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchUser(id));
  }, [id, dispatch]);

  return (
    <>
      <ProfileHeader user={user} id={id} />
      <div className="profile-main-container">
        <Route exact path="/users/:id">
          <ProfileFeed user={user} />
        </Route>
        <Route path="/users/:id/about">
          <ProfileAbout user={user} />
        </Route>
        <Route path="/users/:id/friends">
          <div className="friends-tab">
            {users && <ProfileFriends user={user} />}
          </div>
        </Route>
        <Route path="/users/:id/photos"></Route>
      </div>
    </>
  );
}

export default ProfilePage;
