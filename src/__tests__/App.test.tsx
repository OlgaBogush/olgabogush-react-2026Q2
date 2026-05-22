import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import '@testing-library/jest-dom';

import App from '../App';

jest.mock(
  '../pages/Header',
  () =>
    function MockHeader() {
      return <div data-testid="header">Header</div>;
    }
);
jest.mock(
  '../pages/Footer',
  () =>
    function MockFooter() {
      return <div data-testid="footer">Footer</div>;
    }
);
jest.mock(
  '../pages/Main',
  () =>
    function MockMain() {
      return <div data-testid="page-main">Main Page</div>;
    }
);
jest.mock(
  '../components/About',
  () =>
    function MockAbout() {
      return <div data-testid="page-about">About Page</div>;
    }
);
jest.mock(
  '../pages/NotFoundPage',
  () =>
    function MockNotFoundPage() {
      return <div data-testid="page-not-found">Not Found Page</div>;
    }
);
jest.mock(
  '../components/SingleCard',
  () =>
    function MockSingleCard() {
      return <div data-testid="single-card">Single Card</div>;
    }
);

describe('App', () => {
  test('render Header and Footer', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  test('render Main', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId('page-main')).toBeInTheDocument();
  });

  test('render About', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId('page-about')).toBeInTheDocument();
  });

  test('render NotFound', () => {
    render(
      <MemoryRouter initialEntries={['/some/random-page']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId('page-not-found')).toBeInTheDocument();
  });
});
