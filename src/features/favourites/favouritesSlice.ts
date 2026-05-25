import { createSlice } from '@reduxjs/toolkit';
import { DataItem } from '../../components/CardsList';

export interface FavouritesState {
  favourites: DataItem[];
}

const initialState: FavouritesState = {
  favourites: [],
};

export const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addItemToFavourites: (state, { payload }) => {
      const found = state.favourites.find((item) => item.id === payload.id);
      if (!found) {
        state.favourites.push(payload);
      } else
        state.favourites = state.favourites.filter(
          (item) => item.id !== payload.id
        );
    },
  },
});

export const { addItemToFavourites } = favouritesSlice.actions;
export const favouritesReducer = favouritesSlice.reducer;
