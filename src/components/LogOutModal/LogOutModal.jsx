import React from "react";
import css from "./LogOutModal.module.css"
import Modal from "../Modal/Modal.jsx";

function LogOutModal({ isOpen, onClose }) {

    return (
        <Modal className={css['logOut-modal']} isOpen={isOpen} onClose={onClose}>
            <div className={css['logOut-modal-container']}>
                <p className={css['modal-title']}>Are you logging out?</p>
                <p className={css['modal-description']}>You can always log back in at my time.</p>

                <div className={css['modal-actions']}>
                    <button className={css['modal-btn']}>Log Out</button>
                    <button className={css['modal-btn__outline']} onClick={onClose}>Cancel</button>
                </div>
            </div>
        </Modal>
    );
}

export default LogOutModal;
