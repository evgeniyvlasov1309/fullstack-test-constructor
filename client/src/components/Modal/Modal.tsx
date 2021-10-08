import React from "react";
import { CSSTransition } from "react-transition-group";
import Button from "../Button/Button";
import styles from "./Modal.module.scss";

interface ModalProps {
  open: boolean;
  children: any;
  onClose: () => void;
}

function Modal(props: ModalProps) {
  const { children, open, onClose } = props;

  return (
    <CSSTransition in={open} timeout={200} classNames="modal-transition">
      <>
        {open ? (
          <div className={styles.overlay}>
            <div className={styles.modal}>
              <Button
                variant="icon-close"
                className={styles.close}
                onClick={onClose}
              />
              {children}
            </div>
          </div>
        ) : null}
      </>
    </CSSTransition>
  );
}

export default Modal;
