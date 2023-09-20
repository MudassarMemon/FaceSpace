import React, { useContext, useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

const ModalContext = React.createContext();

export function ModalProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, []);

  return (
    <>
      <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
      <div ref={modalRef} id="portal" />
    </>
  );
}

export function Modal({ onClose, children, background }) {
  const modalNode = useContext(ModalContext);
  let backgroundColor;
  if (background) {
    backgroundColor = "rgba(255, 255, 255, .5)";
  } else {
    backgroundColor = "rgba(255, 255, 255, 0)";
  }

  const modalBackgroundStyle = {
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor,
  };
  const modalContentStyle = {};

  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="modal">
      <div
        style={modalBackgroundStyle}
        id="modal-background"
        onClick={onClose}
      />
      <div id="modal-content">{children}</div>
    </div>,
    modalNode
  );
}
