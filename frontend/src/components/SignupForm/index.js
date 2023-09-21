import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import SignupForm from "./SignupForm";
import "./SignupForm.css";

function SignupFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="signupButtonContainer">
        <button
          onClick={() => {
            setShowModal(true);
          }}
        >
          Create new account
        </button>
      </div>
      {showModal && (
        <Modal>
          <img
            onClick={() => setShowModal(false)}
            id="closeSignUpForm"
            alt="closeSignUpForm"
            src="https://static.xx.fbcdn.net/rsrc.php/v3/yO/r/zgulV2zGm8t.png"
          />
          <SignupForm />
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;
