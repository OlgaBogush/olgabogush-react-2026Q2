import {
  favouritesReducer,
  addItemToFavourites,
} from '../features/favourites/favouritesSlice';

describe('favouritesSlice', () => {
  const mockItem = { id: 1, name: 'Rick Sanchez', image: 'rick.jpeg' };

  test('delete existing item', () => {
    const initialState = {
      favourites: [mockItem],
    };

    const nextState = favouritesReducer(
      initialState,
      addItemToFavourites(mockItem)
    );

    expect(nextState.favourites).toHaveLength(0);
  });
});
