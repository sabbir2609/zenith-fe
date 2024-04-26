'use client';

import { type ElementRef, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';
import { CircleX } from 'lucide-react';

export function Modal({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const dialogRef = useRef<ElementRef<'dialog'>>(null);

    useEffect(() => {
        if (!dialogRef.current?.open) {
            dialogRef.current?.showModal();
        }
    }, []);

    function onDismiss() {
        router.back();
    }

    return createPortal(
        <div className="modal">
            <dialog ref={dialogRef} className="modal" onClose={onDismiss}>
                <div className="modal-box">
                    <div>
                        <button onClick={onDismiss} className="btn btn-sm btn-ghost btn-circle">
                            <CircleX />
                        </button>
                    </div>
                    <div className="mt-4">
                        {children}
                    </div>
                </div>
            </dialog>
        </div>,
        document.getElementById('modal-root')!
    );
}