import { useState } from "react";
import { Trash2 } from "react-feather";
import Modal from "../common/Modal";
import SquareButton from "../common/SquareButton";
import TextInput from "../common/TextInput";
import ActionButton from "../common/ActionButton";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

function PlayersModal(props: Props) {
  const [playerNames, setplayerNames] = useState<string[]>(["", "", ""]);

  const addPlayer = () => {
    setplayerNames([...playerNames, ""]);
  };

  const removePlayer = (indexToRemove: number) => {
    if (playerNames.length > 3) {
      setplayerNames(playerNames.filter((_, index) => index !== indexToRemove));
    }
  };

  const handleInputChange = (index: number, value: string) => {
    const newplayerNames = [...playerNames];
    newplayerNames[index] = value;
    setplayerNames(newplayerNames);
  };

  const savePlayers = () => {
    const isValid = playerNames.every((name) => name.trim() !== "");

    if (isValid) {
      console.log("good");
    }
  };

  return (
    <Modal isOpen={props.isOpen} onRequestClose={props.onClose} contentLabel="Players Modal">
      <div className="flex flex-col items-center">
        <h2>Players</h2>

        <div className="flex items-center my-5">
          <SquareButton onClick={() => removePlayer(playerNames.length - 1)}>-</SquareButton>
          <p className="mx-4 text-lg">{playerNames.length}</p>
          <SquareButton onClick={addPlayer}>+</SquareButton>
        </div>

        {playerNames.map((value, index) => (
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

        <ActionButton className="w-2/3 my-5" onClick={savePlayers}>
          Save
        </ActionButton>
      </div>
    </Modal>
  );
}

export default PlayersModal;
