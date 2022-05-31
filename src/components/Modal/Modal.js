import { createPortal } from "react-dom";
import { useCallback, useEffect } from "react";
import style from "./Modal.module.css";

const modalRoot = document.getElementById("modal-root");

function Modal({ changeModalStatus }) {
  const handleKeydown = useCallback(
    (event) => {
      if (event.code === "Escape") {
        changeModalStatus();
      }
    },
    [changeModalStatus]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);

    return () => window.removeEventListener("keydown", handleKeydown);
  }, [handleKeydown]);

  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) {
      changeModalStatus();
    }
  }

  return createPortal(
    <div onClick={handleBackdropClick} className={style.Overlay}>
      <div className={style.Modal}>
        <button onClick={handleBackdropClick} className={style.exit_button}>
          X
        </button>
        <p className={style.title}>Error</p>
        <p className={style.text}>
          Please add not less than 2 and not more than 5 files.
        </p>
        <button onClick={handleBackdropClick} className={style.button}>
          OK
        </button>
      </div>
    </div>,
    modalRoot
  );
}

export default Modal;
