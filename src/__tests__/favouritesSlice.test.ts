import { DataItem } from '../components/CardsList';
import {
  addItemToFavourites,
  favouritesReducer,
  FavouritesState,
  removeAllItems,
} from '../features/favourites/favouritesSlice';

const mockItem: DataItem = {
  id: 1,
  name: 'Rick Sanchez',
  image: 'https://rickandmortyapi.com',
};

describe('favouritesSlice', () => {
  const initialState: FavouritesState = {
    favourites: [],
  };

  test('initial state', () => {
    expect(favouritesReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  test('addItemToFavourites', () => {
    const actual = favouritesReducer(
      initialState,
      addItemToFavourites(mockItem)
    );

    expect(actual.favourites).toHaveLength(1);
    expect(actual.favourites[0]).toEqual(mockItem);
  });

  test('remove an item', () => {
    const stateWithItem: FavouritesState = { favourites: [mockItem] };
    const actual = favouritesReducer(
      stateWithItem,
      addItemToFavourites(mockItem)
    );

    expect(actual.favourites).toHaveLength(0);
  });

  test('removeAllItems', () => {
    const stateWithItems: FavouritesState = {
      favourites: [mockItem, { ...mockItem, id: 2 }],
    };
    const actual = favouritesReducer(stateWithItems, removeAllItems());

    expect(actual.favourites).toEqual([]);
  });
});
