import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DataItem } from '../../components/CardsList';

interface ThunkConfig {
  rejectValue: string;
}

export const getCards = createAsyncThunk<DataItem[], number, ThunkConfig>(
  'cards/getCards',
  async (page: number, thunkAPI) => {
    try {
      const res = await fetch(
        `https://rickandmortyapi.com/api/character/?page=${page}`
      );

      if (res.status >= 400 && res.status < 500) {
        throw new Error(
          'Something went wrong. No data was found, please, try again later.'
        );
      } else if (res.status >= 500) {
        throw new Error('The server has failed, please, try again later.');
      }

      const data = await res.json();
      return data.results;
    } catch (err) {
      console.log(err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

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
});

export const { resetCardsState } = cardsSlice.actions;
export const cardsReducer = cardsSlice.reducer;
