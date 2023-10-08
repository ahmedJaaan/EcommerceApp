import React from "react";
import styles from "../../Styles/ConfirmationPopup.module.css";

const ConfirmationPopup = ({ message, onConfirm, onCancel }) => {
  return (
    <div className={styles.popupContainer}>
      <div className={styles.popup}>
        <p className={styles.message}>{message}</p>
        <div className={styles.buttonContainer}>
          <button className={styles.confirmButton} onClick={onConfirm}>
            Confirm
          </button>
          <button className={styles.cancelButton} onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
