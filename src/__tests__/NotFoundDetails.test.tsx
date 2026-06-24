import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router';

import { NotFoundDetails } from '../components/NotFoundDetails';

describe('NotFoundDetails', () => {
  const errorMessage = 'Character is not found';

  test('render', () => {
    render(
      <MemoryRouter initialEntries={['/details?page=5']}>
        <Routes>
          <Route
            path="/details"
            element={<NotFoundDetails errorMessageForDetails={errorMessage} />}
          />
          <Route path="/" element={<div>Main Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();

    const closeButton = screen.getByRole('button', { name: 'x' });
    fireEvent.click(closeButton);

    expect(screen.getByText('Main Page')).toBeInTheDocument();
  });
});
