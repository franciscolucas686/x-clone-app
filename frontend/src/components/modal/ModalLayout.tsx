import { useRef } from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "../icons/CloseIcon";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export default function ModalLayout({
  onClose,
  children,
  className,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const clickStartedOutside = useRef(false);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      clickStartedOutside.current = true;
    } else {
      clickStartedOutside.current = false;
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      clickStartedOutside.current &&
      modalRef.current &&
      !modalRef.current.contains(e.target as Node)
    ) {
      onClose();
    }
    clickStartedOutside.current = false;
  };

  return createPortal(
    <div
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
    >
      <div
        ref={modalRef}
        className={`relative bg-white rounded-2xl w-[90%] max-w-[600px] max-h-[90%] overflow-auto p-6 z-50 ${
          className ?? ""
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 left-2"
        >
          <CloseIcon />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
