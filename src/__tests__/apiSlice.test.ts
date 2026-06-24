import { configureStore } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import { apiSlice } from '../features/api/apiSlice';

describe('apiSlice', () => {
  const createTestStore = () =>
    configureStore({
      reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    });

  test('getCards', async () => {
    const store = createTestStore();
    const action = store.dispatch(apiSlice.endpoints.getCards.initiate(1));
    const { data, status } = await action;

    expect(status).toBe('fulfilled');
    expect(data?.results).toHaveLength(2);
    expect(data?.results[0].name).toBe('Rick Sanchez');
  });

  test('error 404', async () => {
    const store = createTestStore();
    const action = store.dispatch(
      apiSlice.endpoints.getCards.initiate(19999999)
    );
    const { error, status } = await action;

    expect(status).toBe('rejected');

    const fetchError = error as FetchBaseQueryError;
    expect(fetchError?.status).toBe(404);
  });
});
