import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Main from '../pages/Main';
import { DataItem } from '../components/CardsList';

describe('Main', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  test('get the value from localStorage when componentDidMount', () => {
    localStorage.setItem('userValue', 'pokemon');
    render(<Main />);
    const input = screen.getByPlaceholderText('Search Pokémon');
    expect(input).toHaveValue('pokemon');
  });

  test('the Loader appears and disappears', () => {
    render(<Main />);
    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(loader).not.toBeInTheDocument();
    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();
  });

  test('request for an array of Pokemons', async () => {
    const mockArayPokemons: { results: DataItem[] } = {
      results: [
        {
          name: 'bulbasaur',
          url: 'https://pokeapi.co/api/v2/pokemon/1/',
        },
        {
          name: 'ivysaur',
          url: 'https://pokeapi.co/api/v2/pokemon/2/',
        },
        {
          name: 'venusaur',
          url: 'https://pokeapi.co/api/v2/pokemon/3/',
        },
      ],
    };

    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockArayPokemons),
    });

    render(<Main />);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    const cards = await screen.findAllByRole('listitem');
    expect(cards).toHaveLength(3);
  });

  test('request for a single Pokemon', async () => {
    interface PokemonMock {
      name: string;
      species: {
        url: string;
      };
    }
    const mockSinglePokemon: PokemonMock = {
      name: 'ditto',
      species: { url: 'https://pokeapi.co/api/v2/pokemon-species/132/' },
    };

    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockSinglePokemon),
    });

    render(<Main />);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    const nameElement = await screen.findByText('ditto');
    expect(nameElement).toBeInTheDocument();
  });

  test('show error 404', async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      status: 404,
    });
    render(<Main />);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    const errorElementNotFoud = await screen.findByText(
      /A card with that name was not found. Please check the entered data and try again./i
    );
    expect(errorElementNotFoud).toBeInTheDocument();
  });

  test('show error 500', async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      status: 500,
    });
    render(<Main />);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    const errorElementServer = await screen.findByText(
      /The server has failed, please, try again later./i
    );
    expect(errorElementServer).toBeInTheDocument();
  });

  afterEach(() => {
    jest.useRealTimers();
  });
});
