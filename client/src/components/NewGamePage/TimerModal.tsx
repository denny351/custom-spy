import { useState } from "react";
import Modal from "../common/Modal";
import SquareButton from "../common/SquareButton";
import ActionButton from "../common/ActionButton";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

function TimerModal(props: Props) {
  const [count, setCount] = useState<number>(1);

  const incrementCount = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount((prevCount) => prevCount - 1);
    }
  };

  const saveTimer = () => {
    console.log(saveSpies);
  };

  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={() => {
        setCount(1);
        props.onClose();
      }}
      contentLabel="Players Modal"
    >
      <div className="flex flex-col items-center">
        <h2>Timer</h2>

        <div className="flex items-center my-5">
          <SquareButton onClick={decrementCount}>-</SquareButton>
          <p className="mx-4 text-lg">{count} min.</p>
          <SquareButton onClick={incrementCount}>+</SquareButton>
        </div>

        <ActionButton onClick={saveTimer}>Save</ActionButton>
      </div>
    </Modal>
  );
}

export default TimerModal;
