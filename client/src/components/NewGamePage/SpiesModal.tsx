import { useState } from "react";
import Modal from "../common/Modal";
import SquareButton from "../common/SquareButton";
import ActionButton from "../common/ActionButton";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

function SpiesModal(props: Props) {
  const [count, setCount] = useState<number>(1);

  const incrementCount = () => {
    if (count < 5) {
      setCount((prevCount) => prevCount + 1);
    }
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount((prevCount) => prevCount - 1);
    }
  };

  const saveSpies = () => {
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
        <h2>Spies</h2>

        <div className="flex items-center my-5">
          <SquareButton onClick={decrementCount}>-</SquareButton>
          <p className="mx-4 text-lg">{count}</p>
          <SquareButton onClick={incrementCount}>+</SquareButton>
        </div>

        <ActionButton onClick={saveSpies}>Save</ActionButton>
      </div>
    </Modal>
  );
}

export default SpiesModal;
