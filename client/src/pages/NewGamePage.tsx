import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import PlayersModal from "../components/NewGamePage/PlayersModal";
import GameOptionRow from "../components/NewGamePage/GameOptionRow";
import playersIcon from "../assets/players-icon.png";
import spyIcon from "../assets/spy-icon.png";
import timerIcon from "../assets/timer-icon.png";
import setsIcon from "../assets/sets-icon.png";
import SpyCountModal from "../components/NewGamePage/SpyCountModal";
import TimerModal from "../components/NewGamePage/TimerModal";
import Layout from "../components/common/Layout";
import { RootState } from "../store/store";

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

  const gameData = useSelector((state: RootState) => state.game);

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
        infoText={gameData.players.length.toString()}
        onClick={() => toggleModal("playersModal")}
      />
      <GameOptionRow
        icon={spyIcon}
        label="Spies"
        infoText={gameData.spyCount.toString()}
        onClick={() => toggleModal("spiesModal")}
      />
      <GameOptionRow
        icon={timerIcon}
        label="Timer"
        infoText={`${gameData.timer.toString()} min.`}
        onClick={() => toggleModal("timerModal")}
      />
      <Link to="/sets">
        <GameOptionRow
          icon={setsIcon}
          label="Sets"
          infoText={gameData.set.name}
          onClick={() => {}}
        />
      </Link>

      <PlayersModal isOpen={modalState.playersModal} onClose={() => toggleModal("playersModal")} />
      <SpyCountModal isOpen={modalState.spiesModal} onClose={() => toggleModal("spiesModal")} />
      <TimerModal isOpen={modalState.timerModal} onClose={() => toggleModal("timerModal")} />

      <Link to="/game">Game</Link>
    </Layout>
  );
}

export default NewGamePage;
