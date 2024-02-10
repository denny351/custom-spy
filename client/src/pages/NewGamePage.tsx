import { useState } from "react";
import { Link } from "react-router-dom";

import PlayersModal from "../components/NewGamePage/PlayersModal";
import GameOptionRow from "../components/NewGamePage/GameOptionRow";
import playersIcon from "../assets/players-icon.png";
import spyIcon from "../assets/spy-icon.png";
import timerIcon from "../assets/timer-icon.png";
import setsIcon from "../assets/sets-icon.png";
import SpiesModal from "../components/NewGamePage/SpiesModal";
import TimerModal from "../components/NewGamePage/TimerModal";
import Layout from "../components/common/Layout";

interface ModalState {
  playersModal: boolean;
  spiesModal: boolean;
  timerModal: boolean;
}

function NewGamePage() {
  const [modalState, setModalState] = useState<ModalState>({
    playersModal: false,
    spiesModal: false,
    timerModal: false
  });

  const toggleModal = (modalName: keyof ModalState) => {
    setModalState((prevState) => ({
      ...prevState,
      [modalName]: !prevState[modalName]
    }));
  };

  return (
    <Layout>
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
        onClick={() => toggleModal("spiesModal")}
      />
      <GameOptionRow
        icon={timerIcon}
        label="Timer"
        infoText="10 min"
        onClick={() => toggleModal("timerModal")}
      />
      <Link to="/sets">
        <GameOptionRow
          icon={setsIcon}
          label="Sets"
          infoText="Geography"
          onClick={() => toggleModal("playersModal")}
        />
      </Link>

      <PlayersModal isOpen={modalState.playersModal} onClose={() => toggleModal("playersModal")} />
      <SpiesModal isOpen={modalState.spiesModal} onClose={() => toggleModal("spiesModal")} />
      <TimerModal isOpen={modalState.timerModal} onClose={() => toggleModal("timerModal")} />

      <Link to="/game">Game</Link>
    </Layout>
  );
}

export default NewGamePage;
