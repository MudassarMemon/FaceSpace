import "./EditFriendship.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createFriendship,
  deleteFriendship,
  updateFriendship,
  getUsers,
} from "../../store/users";

function EditFriendship({ user, onClose }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const users = useSelector(getUsers);
  let combinedArray = [
    ...users[sessionUser.id - 1]?.friends,
    ...users[sessionUser.id - 1]?.friendRequests,
  ];
  let [friendship] = combinedArray
    .filter((friend) => friend.status === true)
    .filter(
      (friend) => friend.friendId === user.id || friend.userId === user.id
    );

  const areFriends = Boolean(friendship);

  let requestsReceived = users[sessionUser.id - 1]?.friendRequests
    .filter((friend) => friend.status === false)
    .filter((friend) => friend.userId === user.id);

  const receivedPending = Boolean(requestsReceived.length > 0);

  let requestsSent = users[sessionUser.id - 1]?.friends
    .filter((friend) => friend.status === false)
    .filter((friend) => friend.friendId === user.id);

  const sentPending = Boolean(requestsSent.length > 0);

  const handleAddFriend = (e) => {
    dispatch(createFriendship({ userId: sessionUser.id, friendId: user.id }));
    onClose(false);
  };

  const handleRemoveFriend = (e) => {
    const idToDelete =
      friendship?.id || requestsSent[0]?.id || requestsReceived[0]?.id;
    dispatch(deleteFriendship(idToDelete));
    onClose(false);
  };

  const handleAccept = (e) => {
    dispatch(updateFriendship(requestsReceived[0].id));
    onClose(false);
  };

  return (
    <div className="edit-friendship">
      {!areFriends && !receivedPending && !sentPending && (
        <button onClick={(e) => handleAddFriend(e)}>Add Friend</button>
      )}
      {receivedPending && (
        <>
          <button onClick={(e) => handleAccept(e)}>
            Accept Friend Request
          </button>
          <button onClick={(e) => handleRemoveFriend(e)}>
            Reject Friend Request
          </button>
        </>
      )}
      {sentPending && (
        <button onClick={(e) => handleRemoveFriend(e)}>
          Unsend Friend Request
        </button>
      )}
      {areFriends && (
        <button onClick={(e) => handleRemoveFriend(e)}>Remove Friend</button>
      )}
    </div>
  );
}

export default EditFriendship;
