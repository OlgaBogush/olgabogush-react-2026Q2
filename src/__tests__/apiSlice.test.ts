import { configureStore } from '@reduxjs/toolkit';

import '@testing-library/jest-dom';

import { apiSlice } from '../features/api/apiSlice';

const makeTestStore = () =>
  configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
  });

describe('Loading, Errors, Caching', () => {
  const mockData = { results: [{ id: 1, name: 'Rick' }] };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('loading and server error', async () => {
    const store = makeTestStore();

    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve(
        new Response(null, {
          status: 500,
          statusText: 'Internal Server Error',
        })
      )
    );

    const promise = store.dispatch(apiSlice.endpoints.getCards.initiate(1));

    expect(store.getState().api.queries['getCards(1)']?.status).toBe('pending');

    const result = await promise;

    expect(result.status).toBe('rejected');
    expect(result.error).toBeDefined();

    if (result.error && 'status' in result.error) {
      expect(result.error.status).toBe(500);
    }
  });

  test('cache results', async () => {
    const store = makeTestStore();

    const mockFetch = jest.fn().mockImplementation(() =>
      Promise.resolve(
        new Response(JSON.stringify(mockData), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      )
    );
    global.fetch = mockFetch;

    const request1 = store.dispatch(apiSlice.endpoints.getCards.initiate(1));
    await request1;

    expect(mockFetch).toHaveBeenCalledTimes(1);

    const request2 = store.dispatch(apiSlice.endpoints.getCards.initiate(1));
    const result2 = await request2;

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(result2.data).toEqual(mockData);

    request1.unsubscribe();
    request2.unsubscribe();
  });
});
