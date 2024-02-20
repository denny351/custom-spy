import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { HelpCircle } from "react-feather";
import PlayersModal from "../components/NewGamePage/PlayersModal";
import GameOptionRow from "../components/NewGamePage/GameOptionRow";
import playersIcon from "../assets/players-icon.png";
import spyIcon from "../assets/spy-icon.png";
import timerIcon from "../assets/timer-icon.png";
import setsIcon from "../assets/sets-icon.png";
import SpyCountModal from "../components/NewGamePage/SpyCountModal";
import TimerModal from "../components/NewGamePage/TimerModal";
import AuthModal from "../components/NewGamePage/AuthModal";
import Layout from "../components/common/Layout";
import { RootState } from "../store/store";
import ActionButton from "../components/common/ActionButton";
import { resetGameState, setBlankPlayers } from "../store/game/gameSlice";
import { logoutUser } from "../store/user/userSlice";
import useSelectedSet from "../utils/useSelectedSet";
import HelpModal from "../components/NewGamePage/HelpModal";
import { resetCustomSets } from "../store/set/setsSlice";

interface ModalState {
  playersModal: boolean;
  spiesModal: boolean;
  timerModal: boolean;
  authModal: boolean;
  helpModal: boolean;
}

function NewGamePage() {
  const [modalState, setModalState] = useState<ModalState>({
    playersModal: false,
    spiesModal: false,
    timerModal: false,
    authModal: false,
    helpModal: false,
  });

  const { userId } = useSelector((state: RootState) => state.user);
  const { players, spyCount, timer } = useSelector((state: RootState) => state.game);
  const { selectedSetName } = useSelectedSet();
  const dispatch = useDispatch();

  const toggleModal = (modalName: keyof ModalState) => {
    setModalState((prevState) => ({
      ...prevState,
      [modalName]: !prevState[modalName],
    }));
  };

  const handleLoginOrLogout = () => {
    if (userId) {
      dispatch(logoutUser());
      dispatch(resetCustomSets());
      dispatch(resetGameState());
    } else {
      toggleModal("authModal");
    }
  };

  const handleNewGame = () => {
    dispatch(setBlankPlayers());
  };

  return (
    <Layout>
      <button className="flex items-center absolute top-6" onClick={() => toggleModal("helpModal")}>
        <HelpCircle />
      </button>

      <button className="flex items-center absolute top-6 right-5" onClick={handleLoginOrLogout}>
        {userId ? "Logout" : "Login"}
      </button>

      <h1 id="title" className="text-3xl text-center mt-16 mb-8">
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
        <GameOptionRow icon={setsIcon} label="Sets" infoText={selectedSetName} onClick={() => {}} />
      </Link>

      <div className="mt-auto mb-32">
        <Link to="/game" className="block text-center mb-4" onClick={handleNewGame}>
          <ActionButton>Start</ActionButton>
        </Link>
      </div>

      <PlayersModal isOpen={modalState.playersModal} onClose={() => toggleModal("playersModal")} />
      <SpyCountModal isOpen={modalState.spiesModal} onClose={() => toggleModal("spiesModal")} />
      <TimerModal isOpen={modalState.timerModal} onClose={() => toggleModal("timerModal")} />
      <AuthModal isOpen={modalState.authModal} onClose={() => toggleModal("authModal")} />
      <HelpModal isOpen={modalState.helpModal} onClose={() => toggleModal("helpModal")} />
    </Layout>
  );
}

export default NewGamePage;
