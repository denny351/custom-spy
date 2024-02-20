import Modal from "../common/Modal";
import ActionButton from "../common/ActionButton";

interface Props {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onClose: () => void;
}

function ConfirmModal(props: Props) {
  return (
    <Modal isOpen={props.isOpen} onRequestClose={props.onClose} contentLabel="Confirm Modal">
      <div className="flex flex-col items-center text-center">
        <h3>{props.message}</h3>

        <ActionButton onClick={props.onConfirm}>Confirm</ActionButton>
        <p className="text-base underline cursor-pointer" onClick={props.onClose}>
          Cancel
        </p>
      </div>
    </Modal>
  );
}

export default ConfirmModal;
