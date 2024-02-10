import ReactModal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "fit-content",
    maxHeight: "90vh",
    width: "85vw",
    maxWidth: "500px",
    backgroundColor: "black",
    borderRadius: "8px",
  },
};

function Modal(props: ReactModal.Props) {
  const { children, ...rest } = props;

  return (
    <ReactModal style={customStyles} {...rest}>
      {children}
    </ReactModal>
  );
}

export default Modal;
