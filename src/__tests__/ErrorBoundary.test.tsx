import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { ErrorBoundary } from '../components/ErrorBoundary';
import { ErrorComponent } from '../components/ErrorComponent';

describe('ErrorBoundary', () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  test('render', () => {
    render(
      <ErrorBoundary>
        <div data-testid="child-element">test</div>
      </ErrorBoundary>
    );

    expect(screen.getByTestId('child-element')).toBeInTheDocument();
    expect(
      screen.queryByText(/An error has occurred/i)
    ).not.toBeInTheDocument();
  });

  test('check of error catching', () => {
    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(
      screen.getByText(
        /An error has occurred. You can refresh the page to start over./i
      )
    ).toBeInTheDocument();

    expect(consoleSpy).toHaveBeenCalled();
  });
});
