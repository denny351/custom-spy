import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Trash2 } from "react-feather";
import Modal from "../common/Modal";
import SquareButton from "../common/SquareButton";
import TextInput from "../common/TextInput";
import ActionButton from "../common/ActionButton";
import { RootState } from "../../store/store";
import { setPlayers } from "../../store/game/gameSlice";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

function PlayersModal(props: Props) {
  const { players } = useSelector((state: RootState) => state.game);
  const dispatch = useDispatch();

  const [initialPlayers, setInitialPlayers] = useState<string[]>(["", "", ""]);

  useEffect(() => {
    if (props.isOpen) {
      setInitialPlayers(players);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isOpen]);

  const addPlayer = () => {
    dispatch(setPlayers([...players, ""]));
  };

  const removePlayer = (indexToRemove: number) => {
    if (players.length > 3) {
      dispatch(setPlayers(players.filter((_, index) => index !== indexToRemove)));
    }
  };

  const handleInputChange = (index: number, value: string) => {
    const newplayers = [...players];
    newplayers[index] = value;
    dispatch(setPlayers(newplayers));
  };

  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={() => {
        dispatch(setPlayers(initialPlayers));
        props.onClose();
      }}
      contentLabel="Players Modal"
    >
      <div className="flex flex-col items-center">
        <h2>Players</h2>

        <div className="flex items-center my-5">
          <SquareButton onClick={() => removePlayer(players.length - 1)}>-</SquareButton>
          <p className="mx-4 text-lg">{players.length}</p>
          <SquareButton onClick={addPlayer}>+</SquareButton>
        </div>

        {players.map((value, index) => (
          <div key={index} className="relative w-full">
            <TextInput
              placeholder={`Enter player name #${index + 1}`}
              value={value}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
            <span className="absolute right-2.5 top-5 z-10" onClick={() => removePlayer(index)}>
              <Trash2 color="gray" size={18} />
            </span>
          </div>
        ))}

        <ActionButton onClick={props.onClose}>Save</ActionButton>
      </div>
    </Modal>
  );
}

export default PlayersModal;
