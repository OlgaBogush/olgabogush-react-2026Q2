import { store } from '../app/store';

describe('redux store', () => {
  test('render', () => {
    const state = store.getState();

    expect(state).toHaveProperty('favourites');
    expect(state).toHaveProperty('api');
  });
});
