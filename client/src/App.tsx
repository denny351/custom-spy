import playersIcon from "./assets/players-icon.png";

function App() {
  return (
    <div className="container border-2">
      <h1 id="title" className="text-3xl font-bold">
        Custom Spy
      </h1>
      <div>
        <img src={playersIcon} alt="Player icon" />
        <p>Players</p>
      </div>
    </div>
  );
}

export default App;
