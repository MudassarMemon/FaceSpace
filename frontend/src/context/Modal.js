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

export function Modal({ onClose, children, background = true, position }) {
  const modalNode = useContext(ModalContext);

  let backgroundColor;
  if (background) {
    backgroundColor = "rgba(255, 255, 255, .5)";
  } else {
    backgroundColor = "rgba(255, 255, 255, 0)";
  }

  let top;
  let right;
  let left;
  let bottom;
  if (position) {
    top = position[0];
    right = position[1];
    left = position[2];
    bottom = position[3];
  }

  const modalBackgroundStyle = {
    backgroundColor,
  };
  const modalContentStyle = {
    top,
    right,
    left,
    bottom,
  };

  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="modal">
      <div
        style={modalBackgroundStyle}
        id="modal-background"
        onClick={onClose}
      />
      <div style={modalContentStyle} id="modal-content">
        {children}
      </div>
    </div>,
    modalNode
  );
}
