import "./EditFriendship.css";
import { useDispatch, useSelector } from "react-redux";
import { createFriendship, deleteFriendship } from "../../store/users";

function EditFriendship({ user }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const handleAddFriend = () => {
    dispatch(createFriendship({ userId: sessionUser.id, friendId: user.id }));
  };

  const handleRemoveFriend = () => {
    let combinedArray = [...sessionUser.friends, ...sessionUser.friendRequests];
    let [friendship] = combinedArray.filter(
      (friend) => friend.friendId === user.id || friend.userId === user.id
    );

    dispatch(deleteFriendship(friendship.id));
  };

  return (
    <div className="edit-friendship">
      <button onClick={handleAddFriend}>Add Friend</button>
      <button onClick={handleRemoveFriend}>Remove Friend</button>
    </div>
  );
}

export default EditFriendship;
