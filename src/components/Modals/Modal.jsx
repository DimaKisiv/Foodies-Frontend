import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import css from "./Modal.module.css";
import Icon from "../shared/Icon/Icon.jsx";

function Modal({ isOpen, onClose, children }) {
    const wasBackdropMouseDown = useRef(false);

    useEffect(() => {
        if (!isOpen) return;

        const handleEsc = (e) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, [isOpen, onClose]);

    useEffect(() => {
        if (!isOpen) return;
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prevOverflow;
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleBackdropMouseDown = (e) => {
        wasBackdropMouseDown.current = e.target === e.currentTarget;
    };

    const handleBackdropClick = (e) => {
        if (!wasBackdropMouseDown.current) return;
        wasBackdropMouseDown.current = false;
        if (e.target === e.currentTarget) onClose();
    };

    return createPortal(
        <div
            className={css['modal-backdrop']}
            onMouseDown={handleBackdropMouseDown}
            onClick={handleBackdropClick}
        >
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
        </div>,
        document.body
    );
}

export default Modal;
