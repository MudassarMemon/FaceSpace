import "./FriendRequestModal.css";
import { Modal } from "../../context/Modal";
import { useState } from "react";
import FriendRequests from "./FriendRequests";

function FriendRequestModal({ user, users }) {
  const [showModal, setShowModal] = useState(false);
  const requestCount = user?.friendRequests?.filter(
    (item) => item.status === false
  ).length;

  return (
    <>
      <div
        className="friends-req-button-container "
        onClick={() => {
          setShowModal(true);
        }}
      >
        <button>Friend Requests</button>
        {requestCount > 0 ? <p>{requestCount ?? ""}</p> : null}
      </div>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <FriendRequests user={user} users={users} />
        </Modal>
      )}
    </>
  );
}

export default FriendRequestModal;
