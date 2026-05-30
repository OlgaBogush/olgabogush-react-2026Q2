import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { configureStore } from '@reduxjs/toolkit';
import { favouritesReducer } from '../features/favourites/favouritesSlice';
import { Provider } from 'react-redux';

import '@testing-library/jest-dom';

import { App } from '../App';

jest.mock('../pages/Header', () => ({
  Header: function MockHeader() {
    return <div data-testid="header">Header</div>;
  },
}));
jest.mock('../pages/Footer', () => ({
  Footer: function MockFooter() {
    return <div data-testid="footer">Footer</div>;
  },
}));
jest.mock('../pages/Main', () => ({
  Main: function MockMain() {
    return <div data-testid="page-main">Main Page</div>;
  },
}));
jest.mock('../components/About', () => ({
  About: function MockAbout() {
    return <div data-testid="page-about">About Page</div>;
  },
}));
jest.mock('../pages/NotFoundPage', () => ({
  NotFoundPage: function MockNotFoundPage() {
    return <div data-testid="page-not-found">Not Found Page</div>;
  },
}));
jest.mock('../components/SingleCard', () => ({
  SingleCard: function MockSingleCard() {
    return <div data-testid="single-card">Single Card</div>;
  },
}));

describe('App', () => {
  const store = configureStore({
    reducer: { favourites: favouritesReducer },
  });

  test('render Header and Footer', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  test('render Main', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByTestId('page-main')).toBeInTheDocument();
  });

  test('render About', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/about']}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByTestId('page-about')).toBeInTheDocument();
  });

  test('render NotFound', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/some/random-page']}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByTestId('page-not-found')).toBeInTheDocument();
  });
});
