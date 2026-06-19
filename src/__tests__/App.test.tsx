import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';

import { App } from '../App';
import { store } from '../store/store';
import { apiSlice } from '../features/api/apiSlice';

describe('App', () => {
  beforeEach(() => {
    store.dispatch(apiSlice.util.resetApiState());
  });

  test('render', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/OlgaBogush/i)).toBeInTheDocument();
  });

  test('navigate to about', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/about']}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/author:/i)).toBeInTheDocument();
  });
});
