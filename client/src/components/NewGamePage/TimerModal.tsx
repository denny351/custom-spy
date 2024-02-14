import { useEffect, useState } from "react";
import Modal from "../common/Modal";
import SquareButton from "../common/SquareButton";
import ActionButton from "../common/ActionButton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setTimer } from "../../store/game/gameSlice";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

function TimerModal(props: Props) {
  const { timer } = useSelector((state: RootState) => state.game);
  const dispatch = useDispatch();

  const [initialTimer, setInitialTimer] = useState(10);

  useEffect(() => {
    if (props.isOpen) {
      setInitialTimer(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isOpen]);

  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={() => {
        dispatch(setTimer({ type: "set", value: initialTimer }));
        props.onClose();
      }}
      contentLabel="Players Modal"
    >
      <div className="flex flex-col items-center">
        <h2>Timer</h2>

        <div className="flex items-center my-5">
          <SquareButton onClick={() => dispatch(setTimer({ type: "decrement" }))}>-</SquareButton>
          <p className="mx-4 text-lg">{timer} min.</p>
          <SquareButton onClick={() => dispatch(setTimer({ type: "increment" }))}>+</SquareButton>
        </div>

        <ActionButton onClick={props.onClose}>Save</ActionButton>
      </div>
    </Modal>
  );
}

export default TimerModal;
