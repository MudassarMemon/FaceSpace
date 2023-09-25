import { Modal } from "../../context/Modal";
import { useState } from "react";

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

      {showModal && <Modal onClose={() => setShowModal(false)}></Modal>}
    </>
  );
}

export default FriendModal;
