import "./FriendRequests.css";
import { Link } from "react-router-dom";

function FriendRequests({ user, users }) {
  if (!user) return null;

  const validRequests =
    user.friendRequests?.filter((request) => !request.status) || [];

  return (
    <div className="friend-requests-component-container">
      <ul className="friend-requests-list">
        <h3>Friend Requests</h3>
        {validRequests.map((request) => (
          <li key={request.id}>
            <div className="friend-request">
              <Link to={`/users/${request.userId}`}>
                <img alt="" src={users[request.userId - 1]?.avatarUrl} />
                <h5>
                  {users[request.userId - 1]?.firstName}{" "}
                  {users[request.userId - 1]?.lastName}
                </h5>
              </Link>
            </div>
            <div className="friend-accept-deny-button">
              <button className="accept-button">
                <i class="fa-solid fa-check"></i>
              </button>
              <button className="reject-button">
                <i class="fa-solid fa-x"></i>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FriendRequests;
