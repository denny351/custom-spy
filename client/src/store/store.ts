import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./game/gameSlice";
import userReducer from "./user/userSlice";
import setsReducer from "./set/setsSlice";

export const store = configureStore({
  reducer: {
    game: gameReducer,
    user: userReducer,
    sets: setsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
