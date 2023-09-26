import { Modal } from "../../context/Modal";
import { useState } from "react";
import "./FriendModal.css";

function FriendModal({ user }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        className="friends-container"
        onClick={() => {
          setShowModal(true);
        }}
      >
        <button>Friends</button>
      </div>

      {showModal && <Modal onClose={() => setShowModal(false)}></Modal>}
    </>
  );
}

export default FriendModal;
