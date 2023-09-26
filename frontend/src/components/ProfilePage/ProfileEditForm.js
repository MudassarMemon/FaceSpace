import "./ProfileEditForm.css";
import { useState, useEffect, useRef } from "react";
import { updateUser } from "../../store/users";
import { useDispatch } from "react-redux";

function ProfileEditForm({ onClose, user }) {
  const [bio, setBio] = useState(user.bio ? user.bio : "");
  const [currentCity, setCurrentCity] = useState(
    user.currentCity ? user.currentCity : ""
  );
  const [workplace, setWorkplace] = useState(
    user.workplace ? user.workplace : ""
  );
  const [school, setSchool] = useState(user.school ? user.school : "");
  const [hometown, setHometown] = useState(user.hometown ? user.hometown : "");
  const [pronunciation, setPronunciation] = useState(
    user.pronunciation ? user.pronunciation : ""
  );
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
        <input
          type="text"
          value={currentCity}
          placeholder=""
          onChange={(e) => setCurrentCity(e.target.value)}
        />
        <input
          type="text"
          value={workplace}
          placeholder=""
          onChange={(e) => setWorkplace(e.target.value)}
        />
        <input
          type="text"
          value={school}
          placeholder=""
          onChange={(e) => setSchool(e.target.value)}
        />
        <input
          type="text"
          value={hometown}
          placeholder=""
          onChange={(e) => setHometown(e.target.value)}
        />
        <input
          type="text"
          value={pronunciation}
          placeholder=""
          onChange={(e) => setPronunciation(e.target.value)}
        />
        <button>Save</button>
      </form>
    </div>
  );
}

export default ProfileEditForm;
