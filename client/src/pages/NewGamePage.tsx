import { Link } from "react-router-dom";
import GameOptionRow from "../components/GameOptionRow";
import playersIcon from "../assets/players-icon.png";
import spyIcon from "../assets/spy-icon.png";
import timerIcon from "../assets/timer-icon.png";
import setsIcon from "../assets/sets-icon.png";

function NewGamePage() {
  return (
    <div className="container mx-auto	max-w-2xl p-4 border-2">
      <h1 id="title" className="text-3xl text-center my-8">
        Custom Spy
      </h1>

      <GameOptionRow icon={playersIcon} label="Players" infoText="3" />
      <GameOptionRow icon={spyIcon} label="Spies" infoText="3" />
      <GameOptionRow icon={timerIcon} label="Timer" infoText="10 min" />
      <GameOptionRow icon={setsIcon} label="Sets" infoText="Geography" />

      <Link to="/game">Game</Link>
    </div>
  );
}

export default NewGamePage;
