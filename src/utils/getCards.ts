import { createAsyncThunk } from '@reduxjs/toolkit';

import { DataItem } from '../components/CardsList';

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
