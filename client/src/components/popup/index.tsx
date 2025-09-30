import React, { useState } from "react";
import ReactDOM from "react-dom";

// Hook quản lý popup
export function usePopup() {
    const [isOpen, setIsOpen] = useState(false);

    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);
    const toggle = () => setIsOpen((prev) => !prev);

    return { isOpen, open, close, toggle };
}

// Component Popup
export function Popup({ isOpen, close, children }: { isOpen: boolean; close: () => void; children: React.ReactNode }) {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-2xl shadow-lg relative">
                {children}
                <button
                    onClick={close}
                    className="absolute top-2 right-2 text-gray-500 hover:text-black"
                >
                    ✕
                </button>
            </div>
        </div>,
        document.body
    );
}
