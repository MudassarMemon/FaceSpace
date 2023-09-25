import "./ProfileEditForm.css";
import { useState, useEffect, useRef } from "react";
import { updateUser } from "../../store/users";
import { useDispatch } from "react-redux";

function ProfileEditForm({ onClose, user }) {
  const [bio, setBio] = useState(user.bio ? user.bio : "");
  const dispatch = useDispatch();
  const bioInput = useRef();

  useEffect(() => {
    bioInput.current.focus();
  }, [bioInput]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
    dispatch(updateUser({ ...user, bio }));
  };

  return (
    <div className="edit-user-form">
      <img
        onClick={onClose}
        id="closeEditUser"
        alt="closeEditUser"
        src="https://static.xx.fbcdn.net/rsrc.php/v3/yO/r/zgulV2zGm8t.png"
      />
      <form onSubmit={handleSubmit}>
        <h1>Edit Bio</h1>
        <textarea
          ref={bioInput}
          value={bio}
          placeholder="Describe who you are"
          onChange={(e) => setBio(e.target.value)}
          id="edit-bio"
          name="edit-bio"
          rows="4"
          cols="50"
        />
        <button>Save</button>
      </form>
    </div>
  );
}

export default ProfileEditForm;
