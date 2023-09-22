import "./EditProfile.css";
import { useState } from "react";
import { updateUser } from "../../store/users";
import { useDispatch } from "react-redux";

function EditProfileModal({ onClose, user }) {
  const [bio, setBio] = useState(user.bio ? user.bio : "");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    // debugger;
    dispatch(updateUser({ ...user, bio }));
    console.log("submitting");
  };

  return (
    <>
      <img
        onClick={onClose}
        id="closeEditUser"
        alt="closeEditUser"
        src="https://static.xx.fbcdn.net/rsrc.php/v3/yO/r/zgulV2zGm8t.png"
      />
      <form onSubmit={handleSubmit}>
        <h1>Edit Bio</h1>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          id="edit-bio"
          name="edit-bio"
          rows="4"
          cols="50"
        />
        <button>Update Bio</button>
      </form>
    </>
  );
}

export default EditProfileModal;
