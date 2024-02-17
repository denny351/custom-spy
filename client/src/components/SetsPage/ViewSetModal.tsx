import Modal from "../common/Modal";
import ActionButton from "../common/ActionButton";
import { Set } from "../../interfaces/Set";

interface Props {
  set: Set | null;
  isOpen: boolean;
  onClose: () => void;
}

function ViewSetModal(props: Props) {
  return (
    <Modal isOpen={props.isOpen} onRequestClose={props.onClose} contentLabel="View Set Modal">
      <div className="flex flex-col items-center">
        {props.set?.locations.map((location) => (
          <p key={location.id} className="my-1 text-center">
            {location.name}
          </p>
        ))}
        <ActionButton className="mb-3" onClick={props.onClose}>
          Close
        </ActionButton>
      </div>
    </Modal>
  );
}

export default ViewSetModal;
