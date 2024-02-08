import { Link } from "react-router-dom";

function GameViewPage() {
  return (
    <div className="container mx-auto	border-2">
      <h1 id="title" className="text-3xl text-center">
        GameViewPage
      </h1>
      <Link to="/">Home</Link>
    </div>
  );
}

export default GameViewPage;
