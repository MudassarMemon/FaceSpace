import "./UserIcon.css";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function UserIcon({ user }) {
  const history = useHistory();

  return (
    <img
      id="user-icon"
      alt=""
      src={user && user.avatarUrl}
      onClick={history.push(`/users/${user.id}`)}
    />
  );
}

// export default UserIcon;
