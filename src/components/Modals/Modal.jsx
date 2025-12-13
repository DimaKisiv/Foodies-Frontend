import React, { useEffect } from "react";
import css from "./Modal.module.css"
import Icon from "../shared/Icon/Icon.jsx";

function Modal({ isOpen, onClose, children }) {
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    if (!isOpen) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    return (
        <div className={css['modal-backdrop']} onClick={handleBackdropClick}>
            <div className={css['modal-window']}>
                <button className={css['modal-window-close']} onClick={onClose}>
                    <Icon
                        id='icon-close'
                        width={24}
                        height={24}
                        aria-hidden="true"
                    />
                </button>

                {children}
            </div>
        </div>
    );
}

export default Modal;
