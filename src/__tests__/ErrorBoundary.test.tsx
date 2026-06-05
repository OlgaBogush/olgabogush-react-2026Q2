import { render, screen } from '@testing-library/react';

import { ErrorBoundary } from '../components/ErrorBoundary';

const TestComponent = () => {
  throw new Error('Test breaking error');
};

describe('ErrorBoundary', () => {
  test('render content', () => {
    render(
      <ErrorBoundary>
        <div>Useful Content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Useful Content')).toBeInTheDocument();
  });

  test('render error', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <TestComponent />
      </ErrorBoundary>
    );

    expect(
      screen.getByRole('heading', {
        name: /an error has occurred\. you can refresh the page to start over\./i,
      })
    ).toBeInTheDocument();

    consoleSpy.mockRestore();
  });
});
