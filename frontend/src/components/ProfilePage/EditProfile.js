import "./EditProfile.css";

function EditProfileModal({ onClose }) {
  return (
    <>
      <img
        onClick={onClose}
        id="closeEditUser"
        alt="closeEditUser"
        src="https://static.xx.fbcdn.net/rsrc.php/v3/yO/r/zgulV2zGm8t.png"
      />
      <h1>Edit Profile Container</h1>{" "}
    </>
  );
}

export default EditProfileModal;
