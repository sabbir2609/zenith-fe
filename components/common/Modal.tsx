"use client";

import type { FC, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface ModalProps {
    children: ReactNode;
}

const Modal: FC<ModalProps> = ({ children }) => {
    const router = useRouter();

    const handleOnOpenChange = (open: boolean) => {
        if (!open) {
            router.back();
        }
    };

    return (
        <dialog id="my_modal" className="modal">
            <div className="modal-box">
                {children}
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
};

export default Modal;