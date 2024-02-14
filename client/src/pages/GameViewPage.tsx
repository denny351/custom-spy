import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft } from "react-feather";
import SpyCard from "../components/GameViewPage/SpyCard";
import Layout from "../components/common/Layout";
import ActionButton from "../components/common/ActionButton";
import { resetState } from "../store/game/gameSlice";
import useSelectedSet from "../utils/useSelectedSet";

function GameViewPage() {
  const { players, timer } = useSelector((state: RootState) => state.game);
  const { selectedSetLocations } = useSelectedSet();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(timer * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [spyCardKey, setSpyCardKey] = useState(0); // used to fresh render SpyCard when resetting game
  const [location, setLocation] = useState(
    () => selectedSetLocations[Math.floor(Math.random() * selectedSetLocations.length)]
  );
  const [spy, setSpy] = useState(() => players[Math.floor(Math.random() * players.length)]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (players.every((player) => player === "")) {
      navigate("/");
    }
  }, [navigate, players]);

  useEffect(() => {
    let timer: number;
    if (isTimerRunning) {
      timer = setInterval(() => {
        setTotalSeconds((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isTimerRunning]);

  const resetGame = () => {
    setLocation(selectedSetLocations[Math.floor(Math.random() * selectedSetLocations.length)]);
    setSpy(players[Math.floor(Math.random() * players.length)]);
    setCurrentIndex(0);
    setSpyCardKey((prevKey) => prevKey + 1);
  };

  const renderTimer = () => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    if (totalSeconds > 0) {
      return (
        <>
          <h1 className="text-2xl mb-6">
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </h1>
          <ActionButton onClick={() => setIsTimerRunning((bool) => !bool)}>
            {isTimerRunning ? "Pause" : "Start"}
          </ActionButton>
        </>
      );
    } else {
      return <h1 className="text-2xl">Finished</h1>;
    }
  };

  return (
    <Layout>
      <Link
        to="/"
        className="flex items-center absolute top-6"
        onClick={() => {
          dispatch(resetState());
        }}
      >
        <ChevronLeft />
        Back
      </Link>

      <button className="flex items-center absolute top-6 right-5" onClick={resetGame}>
        Restart
      </button>

      <div className="flex flex-col justify-center items-center h-full">
        {currentIndex >= players.length ? (
          renderTimer()
        ) : (
          <SpyCard
            key={spyCardKey}
            location={location}
            player={players[currentIndex]}
            isSpy={players[currentIndex] === spy}
            onClick={() => setCurrentIndex((prev) => prev + 1)}
          />
        )}
      </div>
    </Layout>
  );
}

export default GameViewPage;
