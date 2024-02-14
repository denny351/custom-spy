import { useState, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft } from "react-feather";
import SpyCard from "../components/GameViewPage/SpyCard";
import Layout from "../components/common/Layout";
import ActionButton from "../components/common/ActionButton";

function GameViewPage() {
  const { sets, selectedSetId, players, timer } = useSelector((state: RootState) => state.game);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [totalSeconds, setTotalSeconds] = useState<number>(timer * 1);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  const setLocations = sets[selectedSetId].locations;
  const location = useMemo(() => setLocations[Math.floor(Math.random() * setLocations.length)], [setLocations]);
  const spy = useMemo(() => players[Math.floor(Math.random() * players.length)], [players]);

  const navigate = useNavigate();

  useEffect(() => {
    let timer: number;
    if (isTimerRunning) {
      timer = setInterval(() => {
        setTotalSeconds((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isTimerRunning]);

  const handleCardClick = () => {
    setCurrentIndex((prev) => prev + 1);
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
      <Link to="/" className="flex items-center absolute top-6">
        <ChevronLeft />
        Back
      </Link>

      <button className="flex items-center absolute top-6 right-5" onClick={() => navigate(0)}>
        Restart
      </button>

      <div className="flex flex-col justify-center items-center h-full">
        {currentIndex >= players.length ? (
          renderTimer()
        ) : (
          <SpyCard
            location={location.name}
            player={players[currentIndex]}
            isSpy={players[currentIndex] === spy}
            onClick={handleCardClick}
          />
        )}
      </div>
    </Layout>
  );
}

export default GameViewPage;
