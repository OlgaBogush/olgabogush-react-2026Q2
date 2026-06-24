import { render } from '@testing-library/react';

import { ErrorComponent } from '../components/ErrorComponent';

describe('ErrorComponent', () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  test('throw an error', () => {
    expect(() => {
      render(<ErrorComponent />);
    }).toThrow('Test error for errorboundary');
  });
});
