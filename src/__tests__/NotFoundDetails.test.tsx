import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import '@testing-library/jest-dom';

import { NotFoundDetails } from '../components/NotFoundDetails';

const mockNavigate = jest.fn();
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockNavigate,
}));

describe('NotFoundDetails', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('render error message', () => {
    const textError = 'Character not found. Please try again.';

    render(
      <MemoryRouter>
        <NotFoundDetails errorMessageForDetails={textError} />
      </MemoryRouter>
    );

    expect(screen.getByText(textError)).toBeInTheDocument();
  });

  test('redirect using close button to main page', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <NotFoundDetails errorMessageForDetails="Error" />
      </MemoryRouter>
    );

    const button = screen.getByRole('button', { name: /x/i });
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith('/?page=1');
  });

  test('redirect using close button to page from url parameters', () => {
    render(
      <MemoryRouter initialEntries={['/?page=3']}>
        <NotFoundDetails errorMessageForDetails="Error" />
      </MemoryRouter>
    );

    const button = screen.getByRole('button', { name: /x/i });
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith('/?page=3');
  });
});
