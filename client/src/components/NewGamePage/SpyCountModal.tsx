import { useEffect, useState } from "react";
import Modal from "../common/Modal";
import SquareButton from "../common/SquareButton";
import ActionButton from "../common/ActionButton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setSpyCount } from "../../store/game/gameSlice";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

function SpyCountModal(props: Props) {
  const { spyCount } = useSelector((state: RootState) => state.game);
  const dispatch = useDispatch();

  const [initialSpyCount, setInitialSpyCount] = useState<number>(1);

  useEffect(() => {
    if (props.isOpen) {
      setInitialSpyCount(spyCount);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isOpen]);

  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={() => {
        dispatch(setSpyCount({ type: "set", value: initialSpyCount }));
        props.onClose();
      }}
      contentLabel="Players Modal"
    >
      <div className="flex flex-col items-center">
        <h2>Spies</h2>

        <div className="flex items-center my-5">
          <SquareButton onClick={() => dispatch(setSpyCount({ type: "decrement" }))}>
            -
          </SquareButton>
          <p className="mx-4 text-lg">{spyCount}</p>
          <SquareButton onClick={() => dispatch(setSpyCount({ type: "increment" }))}>
            +
          </SquareButton>
        </div>

        <ActionButton onClick={props.onClose}>Save</ActionButton>
      </div>
    </Modal>
  );
}

export default SpyCountModal;
