import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import '@testing-library/jest-dom';

import NotFoundPage from '../pages/NotFoundPage';

describe('NotFoundPage', () => {
  test('render', async () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    expect(
      screen.getByText(
        /Something went wrong. No data was found, please, try again later./i
      )
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /go to the main page/i })
    ).toBeInTheDocument();
  });

  test('redirect', async () => {
    render(
      <MemoryRouter initialEntries={['/not-found']}>
        <Routes>
          <Route path="/not-found" element={<NotFoundPage />} />
          <Route path="/" element={<div>Main page</div>} />
        </Routes>
      </MemoryRouter>
    );

    const button = screen.getByRole('button', { name: /go to the main page/i });

    fireEvent.click(button);

    expect(screen.getByText('Main page')).toBeInTheDocument();
  });
});
