import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SelectedSet } from "../../interfaces/Set";

interface GameState {
  players: string[];
  spyCount: number;
  timer: number;
  selectedSet: SelectedSet;
}

const initialState: GameState = {
  players: ["", "", ""],
  spyCount: 1,
  timer: 10,
  selectedSet: { type: "premade", id: 1 },
};

type SpyCountAndTimerActionPayload = { type: "set"; value: number } | { type: "increment" } | { type: "decrement" };

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setPlayers: (state, action: PayloadAction<string[]>) => {
      state.players = action.payload;
    },
    setBlankPlayers: (state) => {
      state.players = state.players.map((player, index) => (player.trim() === "" ? `Player ${index + 1}` : player));
    },
    setSpyCount: (state, action: PayloadAction<SpyCountAndTimerActionPayload>) => {
      switch (action.payload.type) {
        case "set":
          state.spyCount = action.payload.value;
          break;
        case "increment":
          if (state.spyCount < state.players.length - 1) {
            state.spyCount += 1;
          }
          break;
        case "decrement":
          if (state.spyCount > 1) {
            state.spyCount -= 1;
          }
          break;
        default:
          break;
      }
    },
    setTimer: (state, action: PayloadAction<SpyCountAndTimerActionPayload>) => {
      switch (action.payload.type) {
        case "set":
          state.timer = action.payload.value;
          break;
        case "increment":
          state.timer += 1;
          break;
        case "decrement":
          if (state.timer > 1) {
            state.timer -= 1;
          }
          break;
        default:
          break;
      }
    },
    setSelectedSet: (state, action: PayloadAction<SelectedSet>) => {
      state.selectedSet = { type: action.payload.type, id: action.payload.id };
    },
    resetGameState: () => initialState,
  },
});

export const { setPlayers, setBlankPlayers, setSpyCount, setTimer, setSelectedSet, resetGameState } = gameSlice.actions;

export default gameSlice.reducer;
