import "./FriendRequests.css";
import { Link } from "react-router-dom";
import { updateFriendship, deleteFriendship } from "../../store/users";
import { useDispatch } from "react-redux";

function FriendRequests({ user, users }) {
  const dispatch = useDispatch();

  const handleAccept = (e) => {
    dispatch(updateFriendship(e.currentTarget.id));
  };

  const handleReject = (e) => {
    dispatch(deleteFriendship(e.currentTarget.id));
  };

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
              <button
                className="accept-button"
                id={request.id}
                onClick={(e) => handleAccept(e)}
              >
                <i className="fa-solid fa-check"></i>
              </button>
              <button
                className="reject-button"
                id={request.id}
                onClick={(e) => handleReject(e)}
              >
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FriendRequests;
