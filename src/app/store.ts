import { configureStore } from '@reduxjs/toolkit';
import { cardsReducer } from '../features/cards/cardsSlice';

export const store = configureStore({
  reducer: {
    cards: cardsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
