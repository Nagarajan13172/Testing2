import { useEffect } from "react";
import { createPortal } from "react-dom";

export default function PopupModal({ isOpen, onClose, title, children }) {
    // Close on Escape and lock body scroll while the modal is open.
    useEffect(() => {
        if (!isOpen) return;

        const onKeyDown = (e) => {
            if (e.key === "Escape") onClose();
        };

        document.addEventListener("keydown", onKeyDown);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = "";
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return createPortal(
        // Clicking the overlay closes; clicking the dialog does not (stopPropagation).
        <div style={styles.overlay} onClick={onClose}>
            <div
                style={styles.dialog}
                role="dialog"
                aria-modal="true"
                onClick={(e) => e.stopPropagation()}
            >
                <div style={styles.header}>
                    <h3 style={styles.title}>{title}</h3>
                    <button
                        style={styles.close}
                        onClick={onClose}
                        aria-label="Close"
                    >
                        ×
                    </button>
                </div>

                <div style={styles.body}>{children}</div>
            </div>
        </div>,
        document.body
    );
}

const styles = {
    overlay: {
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
    },
    dialog: {
        background: "#fff",
        borderRadius: "10px",
        width: "min(420px, 90vw)",
        boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2)",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "14px 18px",
        borderBottom: "1px solid #eee",
    },
    title: {
        margin: 0,
        fontSize: "16px",
    },
    close: {
        border: "none",
        background: "transparent",
        fontSize: "22px",
        lineHeight: 1,
        cursor: "pointer",
    },
    body: {
        padding: "18px",
        fontSize: "14px",
        color: "#444",
        lineHeight: 1.5,
    },
};
