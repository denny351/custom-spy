import { Link } from "react-router-dom";
import playersIcon from "../assets/players-icon.png";

function NewGamePage() {
  return (
    <div className="container mx-auto	border-2">
      <h1 id="title" className="text-3xl text-center">
        Custom Spy
      </h1>
      <div>
        <img src={playersIcon} alt="Player icon" />
        <p>Players</p>
      </div>
      <Link to="/game">Game</Link>
    </div>
  );
}

export default NewGamePage;
