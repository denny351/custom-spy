import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Trash2 } from "react-feather";
import Modal from "../common/Modal";
import SquareButton from "../common/SquareButton";
import ActionButton from "../common/ActionButton";
import { RootState } from "../../store/store";
import { setPlayers } from "../../store/game/gameSlice";
import TextInputWithButton from "../common/TextInputWithButton";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

function PlayersModal(props: Props) {
  const { players } = useSelector((state: RootState) => state.game);
  const dispatch = useDispatch();

  const [prevPlayers, setPrevPlayers] = useState<string[]>(players);

  useEffect(() => {
    if (props.isOpen) {
      setPrevPlayers(players);
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
    const newPlayers = [...players];
    newPlayers[index] = value;
    dispatch(setPlayers(newPlayers));
  };

  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={() => {
        dispatch(setPlayers(prevPlayers));
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
          <TextInputWithButton
            key={index}
            placeholder={`Enter player name #${index + 1}`}
            value={value}
            onChange={(e) => handleInputChange(index, e.target.value)}
            onButtonClick={() => removePlayer(index)}
            buttonIcon={<Trash2 color="gray" size={18} />}
          />
        ))}

        <ActionButton onClick={props.onClose}>Save</ActionButton>
      </div>
    </Modal>
  );
}

export default PlayersModal;
