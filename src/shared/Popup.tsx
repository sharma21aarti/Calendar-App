import { useRef, ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  show: boolean;
  close: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
}
interface CSSProperties {
  [key: string]: string | number;
}

const Background: CSSProperties = {
  width: "100%",
  height: "100%",
  left: "0",
  top: "0",
  position: "fixed" as "fixed", // Explicitly specify "fixed" as the value
  backgroundColor: "rgba(0,0,0,0.7)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 10000, // Remove quotes around the number
};

const ModalWrapper: CSSProperties = {
  boxShadow: "0 5px 16px rgba(0, 0, 0, 0.2)",
  color: "#000",
  position: "relative" as "relative", // Explicitly specify "relative" as the value
  zIndex: 10, // Remove quotes around the number
  width: "100%",
  display: "flex",
  justifyContent: "center",
  borderRadius: "10px",
};

const Modal: React.FC<ModalProps> = ({ show, close, children }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current === e.target) {
      close(false);
    }
  };
  const modalContainer = document.getElementById("modal");
  if (modalContainer) {
    return createPortal(
      <>
        {show ? (
          <div
            className=""
            onClick={closeModal}
            ref={modalRef}
            style={Background}
          >
            <div style={ModalWrapper}>{children}</div>
          </div>
        ) : null}
      </>,
      modalContainer // Provide the container element
    );
  } else {
    return null;
  }
};

export default Modal;
