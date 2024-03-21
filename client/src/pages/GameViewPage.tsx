import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft } from "react-feather";
import SpyCard from "../components/GameViewPage/SpyCard";
import Layout from "../components/common/Layout";
import ActionButton from "../components/common/ActionButton";
import useSelectedSet from "../utils/useSelectedSet";

function GameViewPage() {
  const { players, timer, spyCount } = useSelector((state: RootState) => state.game);
  const { selectedSetLocations } = useSelectedSet();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(timer * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [spyCardKey, setSpyCardKey] = useState(0); // used to fresh render SpyCard when resetting game
  const [location, setLocation] = useState(
    () => selectedSetLocations[Math.floor(Math.random() * selectedSetLocations.length)]
  );
  const [spies, setSpies] = useState<string[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (players.every((player) => player === "")) {
      navigate("/");
    }
    setSpies(generateSpies(players, spyCount));
  }, [navigate, players, spyCount]);

  useEffect(() => {
    let timer: number | undefined;
    if (isTimerRunning) {
      timer = setInterval(() => {
        setTotalSeconds((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isTimerRunning]);

  const generateSpies = (players: string[], spyCount: number) => {
    const selectedSpies: string[] = [];

    while (selectedSpies.length < spyCount) {
      const randomIndex = Math.floor(Math.random() * players.length);
      const potentialSpy = players[randomIndex];

      if (!selectedSpies.includes(potentialSpy)) {
        selectedSpies.push(potentialSpy);
      }
    }

    return selectedSpies;
  };

  const resetGame = () => {
    setIsTimerRunning(false);
    setTotalSeconds(timer * 60);
    setLocation(selectedSetLocations[Math.floor(Math.random() * selectedSetLocations.length)]);
    setSpies(generateSpies(players, spyCount));
    setCurrentCardIndex(0);
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
      <Link to="/" className="flex items-center absolute top-6">
        <ChevronLeft />
        Back
      </Link>

      <button className="flex items-center absolute top-6 right-5" onClick={resetGame}>
        New Game
      </button>

      <div className="flex flex-col grow justify-center items-center">
        {currentCardIndex >= players.length ? (
          renderTimer()
        ) : (
          <SpyCard
            key={spyCardKey}
            location={location.name}
            player={players[currentCardIndex]}
            isSpy={spies.includes(players[currentCardIndex])}
            onClick={() => setCurrentCardIndex((prev) => prev + 1)}
          />
        )}
      </div>
    </Layout>
  );
}

export default GameViewPage;
