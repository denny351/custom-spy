import { BrowserRouter, Route, Routes } from "react-router-dom";
import NewGamePage from "./pages/NewGamePage";
import GameViewPage from "./pages/GameViewPage";
import SetsPage from "./pages/SetsPage";
import { useDispatch } from "react-redux";
import { getUserId } from "./store/user/userSlice";
import { AppDispatch } from "./store/store";
import { useEffect } from "react";
import { getSets } from "./store/set/setsSlice";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (localStorage.token) {
      dispatch(getUserId());
      dispatch(getSets());
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NewGamePage />} />
        <Route path="/sets" element={<SetsPage />} />
        <Route path="/game" element={<GameViewPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
