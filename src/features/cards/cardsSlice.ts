import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DataItem } from '../../components/CardsList';
import { getCards } from '../../utils/getCards';

export interface CardsState {
  cards: DataItem[];
  errorState: string | null;
  isLoading: boolean;
}

const initialState: CardsState = {
  cards: [],
  errorState: null,
  isLoading: true,
};

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    resetCardsState: (state) => {
      state.cards = [];
      state.errorState = null;
      state.isLoading = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCards.pending, (state) => {
      state.isLoading = true;
      state.errorState = null;
    });
    builder.addCase(
      getCards.fulfilled,
      (state, { payload }: PayloadAction<DataItem[]>) => {
        state.cards = payload;
        state.isLoading = false;
      }
    );
    builder.addCase(getCards.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.errorState = payload || 'Unknown error';
    });
  },
  selectors: {
    selectCards: (state) => state.cards,
    selectErrorState: (state) => state.errorState,
    selectIsLoading: (state) => state.isLoading,
  },
});

export const { resetCardsState } = cardsSlice.actions;
export const { selectCards, selectErrorState, selectIsLoading } =
  cardsSlice.selectors;
export const cardsReducer = cardsSlice.reducer;
