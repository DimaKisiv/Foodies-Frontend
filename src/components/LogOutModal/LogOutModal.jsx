import React from "react";
import css from "./LogOutModal.module.css"
import Modal from "../Modal/Modal.jsx";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/auth/authOperations.js";

function LogOutModal({ isOpen, onClose }) {
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(logout());
    };

    return (
        <Modal className={css['logOut-modal']} isOpen={isOpen} onClose={onClose}>
            <div className={css['logOut-modal-container']}>
                <p className={css['modal-title']}>Are you logging out?</p>
                <p className={css['modal-description']}>You can always log back in at my time.</p>

                <div className={css['modal-actions']}>
                    <button className={css['modal-btn']} onClick={handleSubmit}>Log Out</button>
                    <button className={css['modal-btn__outline']} onClick={onClose}>Cancel</button>
                </div>
            </div>
        </Modal>
    );
}

export default LogOutModal;
