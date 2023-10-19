import "./ProfileFriends.css";
import { useSelector } from "react-redux";
import { getUsers } from "../../store/users";
import { Link, useHistory } from "react-router-dom";
import FriendRequestModal from "./FriendRequestModal";

function ProfileFriends({ user }) {
  const users = useSelector(getUsers);
  const history = useHistory();

  if (!users || !user) return null;
  return (
    <div
      className={
        history.location.pathname.includes("friends")
          ? "friends-component-container-full-width"
          : "friends-component-container"
      }
    >
      {" "}
      <FriendRequestModal user={user} users={users} />
      <ul className="friend">
        {user.friendRequests?.map((request) => {
          if (request.status) {
            return (
              <div className="friend" key={request.id}>
                <li>
                  <Link to={`/users/${request.userId}`}>
                    <img alt="" src={users[request.userId - 1]?.avatarUrl} />
                    <h5>
                      {users[request.userId - 1]?.firstName}{" "}
                      {users[request.userId - 1]?.lastName}
                    </h5>
                  </Link>
                </li>
              </div>
            );
          } else {
            return null;
          }
        })}
        {user.friends?.map((request) => {
          if (request.status) {
            return (
              <div className="friend" key={request.id}>
                <li>
                  <Link to={`/users/${request.friendId}`}>
                    <img alt="" src={users[request.friendId - 1]?.avatarUrl} />
                    <h5>
                      {users[request.friendId - 1]?.firstName}{" "}
                      {users[request.friendId - 1]?.lastName}
                    </h5>
                  </Link>
                </li>
              </div>
            );
          } else {
            return null;
          }
        })}
      </ul>
    </div>
  );
}

export default ProfileFriends;
