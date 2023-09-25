import { Modal } from "../../context/Modal";
import { useState } from "react";
// import ProfileEditForm from "./ProfileEditModal";

function FriendModal({ user }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        className="edit-profile-container"
        onClick={() => {
          setShowModal(true);
        }}
      >
        <div className="edit-icon"></div>
        <button>Friends</button>
      </div>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {/* <ProfileEditForm onClose={() => setShowModal(false)} user={user} /> */}
        </Modal>
      )}
    </>
  );
}

export default FriendModal;
