import "./EditFriendship.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createFriendship,
  deleteFriendship,
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
  let [friendship] = combinedArray.filter(
    (friend) => friend.friendId === user.id || friend.userId === user.id
  );

  const areFriends = Boolean(friendship);

  const handleAddFriend = (e) => {
    dispatch(createFriendship({ userId: sessionUser.id, friendId: user.id }));
    onClose(false);
  };

  const handleRemoveFriend = (e) => {
    dispatch(deleteFriendship(friendship.id));
    onClose(false);
  };

  return (
    <div className="edit-friendship">
      <button disabled={areFriends} onClick={(e) => handleAddFriend(e)}>
        Add Friend
      </button>
      <button disabled={!areFriends} onClick={(e) => handleRemoveFriend(e)}>
        Remove Friend
      </button>
    </div>
  );
}

export default EditFriendship;
