import React, { useEffect, useRef } from "react";
import styles from "./styles.module.css";

export default function PopupModal({isOpen,
                                    onClose,
                                    label,
                                    children,
                                    size = "wide"
}) {
    const modalRef = useRef();

    // Handle clicks outside of the pop up
    const handleOutsideClick = (e) => {
        console.log("Handle Outside Click");
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            console.log("calling on close function");
            if (onClose) {
                onClose();
            }
        }
        e.stopPropagation();
    }

    const handleInsideClick = (e) => {
        console.log("Handle Inside Click");
        e.stopPropagation();
    }

    // Close on escape key
    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) {
        return null;
    };

    const temp = size === "wide" ? styles.wide : styles.narrow;
    const contentStyle = `${styles.content} ${temp}`;

    return (
        <div className={styles.container} onClick={handleOutsideClick}>
            <div className={contentStyle} ref={modalRef} onClick={handleInsideClick}>
                <div className={styles.header}>
                    <h3>{label}</h3>
                    {onClose && <div onClick={onClose} className={styles.closeButton}>X</div>}
                </div>
                
                <div className={styles.body}>{children}</div>
            </div>
        </div>
    )
}