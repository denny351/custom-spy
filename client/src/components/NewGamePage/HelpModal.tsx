import Modal from "../common/Modal";
import ActionButton from "../common/ActionButton";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const helpTexts = [
  "After starting, pass the device around to the players to view their assigned roles.",
  "Players take turns asking questions to another player about the location without revealing their role.",
  "Other players answer the questions without giving away the location or their own role.",
  "Players discuss and can vote on who they believe the spy is.",
  "Non-spy players win if they correctly identify the spy. The spy wins if the timer runs out or if they identify the location",
];

function HelpModal(props: Props) {
  return (
    <Modal isOpen={props.isOpen} onRequestClose={props.onClose} contentLabel="Help Modal">
      <div className="flex flex-col items-center">
        <h2 className="mb-4">Instructions</h2>

        <ol>
          {helpTexts.map((text, index) => (
            <li key={index} className="mb-3">
              <p>{text}</p>
            </li>
          ))}
        </ol>
        <ActionButton onClick={props.onClose}>Close</ActionButton>
      </div>
    </Modal>
  );
}

export default HelpModal;
