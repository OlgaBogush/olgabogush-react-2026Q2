import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
    addItemToFavourites: (state, { payload }: PayloadAction<DataItem>) => {
      const found = state.favourites.find((item) => item.id === payload.id);
      if (!found) {
        state.favourites.push(payload);
      } else
        state.favourites = state.favourites.filter(
          (item) => item.id !== payload.id
        );
    },
    removeAllItems: (state) => {
      state.favourites = [];
    },
  },
  selectors: {
    selectFavouritesList: (state) => state.favourites,
  },
});

export const { addItemToFavourites, removeAllItems } = favouritesSlice.actions;
export const { selectFavouritesList } = favouritesSlice.selectors;
export const favouritesReducer = favouritesSlice.reducer;
