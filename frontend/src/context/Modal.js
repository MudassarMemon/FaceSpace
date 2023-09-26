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

  useEffect(() => {
    let body = document.querySelector("body");
    let nav = document.getElementsByClassName("rightNavBarContainer");
    if (body) body.style.overflowY = "hidden";
    if (nav[0]) nav[0].style.marginRight = "25px";
    return () => {
      if (body) body.style.overflowY = "scroll";
      if (nav[0]) nav[0].style.marginRight = "10px";
    };
  }, []);

  let backgroundColor;
  if (background) {
    backgroundColor = "rgba(255, 255, 255, .8)";
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
    bottom = position[2];
    left = position[3];
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
