import React from "react";
import css from "../LogOutModal/LogOutModal.module.css";
import Modal from "../Modal.jsx";

function DeleteRecipeModal({ isOpen, onClose, onConfirm }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onConfirm?.();
      onClose?.();
    } catch (err) {
      // onConfirm should handle errors/toasts; keep modal open on failure
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={css["logOut-modal-container"]}>
        <p className={css["modal-title"]}>Delete this recipe?</p>
        <p className={css["modal-description"]}>
          This action cannot be undone.
        </p>

        <div className={css["modal-actions"]}>
          <button className={css["modal-btn"]} onClick={handleSubmit}>
            Delete
          </button>
          <button className={css["modal-btn__outline"]} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteRecipeModal;
