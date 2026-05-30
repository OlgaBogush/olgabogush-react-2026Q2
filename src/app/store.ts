import { configureStore } from '@reduxjs/toolkit';
import { cardsReducer } from '../features/cards/cardsSlice';
import { favouritesReducer } from '../features/favourites/favouritesSlice';

export const store = configureStore({
  reducer: {
    cards: cardsReducer,
    favourites: favouritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
