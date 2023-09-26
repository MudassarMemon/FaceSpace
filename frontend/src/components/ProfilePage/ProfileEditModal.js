import { Modal } from "../../context/Modal";
import { useState } from "react";
import ProfileEditForm from "./ProfileEditForm";
import "./ProfileEditModal.css";

function ProfileEditModal({ user }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        className="edit-profile-container"
        onClick={(e) => {
          setShowModal(true);
        }}
      >
        <div className="edit-icon"></div>
        <button>Edit Profile</button>
      </div>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ProfileEditForm onClose={() => setShowModal(false)} user={user} />
        </Modal>
      )}
    </>
  );
}

export default ProfileEditModal;
