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
import ActionButton from "../components/common/ActionButton";

interface ModalState {
  playersModal: boolean;
  spiesModal: boolean;
  timerModal: boolean;
}

function NewGamePage() {
  const [modalState, setModalState] = useState<ModalState>({
    playersModal: false,
    spiesModal: false,
    timerModal: false,
  });

  const { players, spyCount, timer, sets, selectedSetId } = useSelector((state: RootState) => state.game);

  const toggleModal = (modalName: keyof ModalState) => {
    setModalState((prevState) => ({
      ...prevState,
      [modalName]: !prevState[modalName],
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
        infoText={players.length.toString()}
        onClick={() => toggleModal("playersModal")}
      />
      <GameOptionRow
        icon={spyIcon}
        label="Spies"
        infoText={spyCount.toString()}
        onClick={() => toggleModal("spiesModal")}
      />
      <GameOptionRow
        icon={timerIcon}
        label="Timer"
        infoText={`${timer.toString()} min.`}
        onClick={() => toggleModal("timerModal")}
      />
      <Link to="/sets">
        <GameOptionRow icon={setsIcon} label="Sets" infoText={sets[selectedSetId].name} onClick={() => {}} />
      </Link>

      <div className="mt-auto mb-8">
        <Link to="/game" className="block text-center mb-4">
          <ActionButton>Start</ActionButton>
        </Link>
      </div>

      <PlayersModal isOpen={modalState.playersModal} onClose={() => toggleModal("playersModal")} />
      <SpyCountModal isOpen={modalState.spiesModal} onClose={() => toggleModal("spiesModal")} />
      <TimerModal isOpen={modalState.timerModal} onClose={() => toggleModal("timerModal")} />
    </Layout>
  );
}

export default NewGamePage;
