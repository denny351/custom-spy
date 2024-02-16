import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./game/gameSlice";
import userReducer from "./user/userSlice";

export const store = configureStore({
  reducer: {
    game: gameReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
