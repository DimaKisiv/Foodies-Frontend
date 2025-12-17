import React from "react";
import css from "./LogOutModal.module.css";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/auth/authOperations.js";
import Modal from "../Modal.jsx";
import { toast } from "react-hot-toast";

function LogOutModal({ isOpen, onClose }) {
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(logout()).unwrap();
      onClose?.();
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      toast.error(message || "Server error. Please try again later");
    }
  };

  return (
    <Modal className={css["logOut-modal"]} isOpen={isOpen} onClose={onClose}>
      <div className={css["logOut-modal-container"]}>
        <p className={css["modal-title"]}>Are you logging out?</p>
        <p className={css["modal-description"]}>
          You can always log back in at my time.
        </p>

        <div className={css["modal-actions"]}>
          <button className={css["modal-btn"]} onClick={handleSubmit}>
            Log Out
          </button>
          <button className={css["modal-btn__outline"]} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default LogOutModal;
