import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router';

import { NotFoundPage } from '../pages/NotFoundPage';
import { store } from '../app/store';
import { Provider } from 'react-redux';

describe('NotFoundPage', () => {
  const renderComponent = (
    initialEntries: (string | Partial<Location>)[] = ['/error']
  ) => {
    return render(
      <Provider store={store}>
        <MemoryRouter initialEntries={initialEntries}>
          <Routes>
            <Route path="/error" element={<NotFoundPage />} />
            <Route path="/" element={<div>Main Page Content</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  };

  test('render default error', () => {
    renderComponent();
    expect(
      screen.getByText('Something went wrong. Please try again later.')
    ).toBeInTheDocument();
  });

  test('render custom error', () => {
    const customState = {
      pathname: '/error',
      state: { msg: 'Server error. Code: 500. Please try again later.' },
    };

    renderComponent([customState]);

    expect(
      screen.getByText('Server error. Code: 500. Please try again later.')
    ).toBeInTheDocument();
  });

  test('navigate to main page', () => {
    renderComponent();
    fireEvent.click(
      screen.getByRole('button', { name: /go to the main page/i })
    );
    expect(screen.getByText('Main Page Content')).toBeInTheDocument();
  });
});
