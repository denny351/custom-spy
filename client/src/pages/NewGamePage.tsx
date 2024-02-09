import { useState } from "react";
import { Link } from "react-router-dom";

import PlayersModal from "../components/NewGamePage/PlayersModal";
import GameOptionRow from "../components/NewGamePage/GameOptionRow";
import playersIcon from "../assets/players-icon.png";
import spyIcon from "../assets/spy-icon.png";
import timerIcon from "../assets/timer-icon.png";
import setsIcon from "../assets/sets-icon.png";

interface ModalState {
  playersModal: boolean;
  modal2: boolean;
  modal3: boolean;
  modal4: boolean;
}

function NewGamePage() {
  const [modalState, setModalState] = useState<ModalState>({
    playersModal: false,
    modal2: false,
    modal3: false,
    modal4: false
  });

  const toggleModal = (modalName: keyof ModalState) => {
    setModalState((prevState) => ({
      ...prevState,
      [modalName]: !prevState[modalName]
    }));
  };

  return (
    <div className="container mx-auto	max-w-2xl p-4 border-2">
      <h1 id="title" className="text-3xl text-center my-8">
        Custom Spy
      </h1>

      <GameOptionRow
        icon={playersIcon}
        label="Players"
        infoText="3"
        onClick={() => toggleModal("playersModal")}
      />
      <GameOptionRow
        icon={spyIcon}
        label="Spies"
        infoText="3"
        onClick={() => toggleModal("playersModal")}
      />
      <GameOptionRow
        icon={timerIcon}
        label="Timer"
        infoText="10 min"
        onClick={() => toggleModal("playersModal")}
      />
      <GameOptionRow
        icon={setsIcon}
        label="Sets"
        infoText="Geography"
        onClick={() => toggleModal("playersModal")}
      />

      <PlayersModal isOpen={modalState.playersModal} onClose={() => toggleModal("playersModal")} />
      <Link to="/game">Game</Link>
    </div>
  );
}

export default NewGamePage;
