import "./FriendModal.css";
import { useState } from "react";
import EditFriendship from "./EditFriendship";

function FriendModal({ user }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        className="friends-container"
        onClick={(e) => {
          setShowModal(!showModal);
        }}
      >
        <button>Friends</button>
      </div>

      {showModal && <EditFriendship user={user} onClose={setShowModal} />}
    </>
  );
}

export default FriendModal;
