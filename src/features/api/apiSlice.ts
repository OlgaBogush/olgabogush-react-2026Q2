import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from '../../utils/constants';
import { DataItem } from '../../components/CardsList';
import { ICharacterState } from '../../components/SingleCard';

interface ICardsResults {
  results: DataItem[];
}

const TTL: number = Number(import.meta.env.VITE_CACHE_TTL) || 300;

export const apiSlice = createApi({
  reducerPath: 'api',
  tagTypes: ['Cards'],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  keepUnusedDataFor: TTL,
  endpoints: (build) => ({
    getCards: build.query<ICardsResults, number>({
      query: (page: number) => `?page=${page}`,
      providesTags: (result) =>
        result
          ? [
              ...result.results.map(({ id }: DataItem) => ({
                type: 'Cards' as const,
                id,
              })),
              { type: 'Cards', id: 'LIST' },
            ]
          : [{ type: 'Cards', id: 'LIST' }],
    }),
    getSingleCard: build.query<ICharacterState, string>({
      query: (id) => `${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Cards', id }],
    }),
  }),
});

export const { useGetCardsQuery, useGetSingleCardQuery } = apiSlice;
