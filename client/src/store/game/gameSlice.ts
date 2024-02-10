import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface GameState {
  players: string[];
  spyCount: number;
  timer: number;
  set: {
    id: number;
    name: string;
  };
}

// Define the initial state using that type
const initialState: GameState = {
  players: ["", "", ""],
  spyCount: 1,
  timer: 10,
  set: {
    id: 1,
    name: "Geography"
  }
};

type SpyCountAndTimerActionPayload =
  | { type: "set"; value: number }
  | { type: "increment" }
  | { type: "decrement" };

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setPlayers: (state, action: PayloadAction<string[]>) => {
      state.players = action.payload;
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
    setSet: (state, action) => {
      state.set = action.payload;
    }
  }
});

export const { setPlayers, setSpyCount, setTimer, setSet } = gameSlice.actions;

export default gameSlice.reducer;
