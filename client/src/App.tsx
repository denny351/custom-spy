import { BrowserRouter, Route, Routes } from "react-router-dom";
import NewGamePage from "./pages/NewGamePage";
import GameViewPage from "./pages/GameViewPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NewGamePage />} />
        <Route path="/game" element={<GameViewPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
