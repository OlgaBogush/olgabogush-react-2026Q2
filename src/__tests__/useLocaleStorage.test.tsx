import { renderHook, act } from '@testing-library/react';
import useLocaleStorage from '../hooks/useLocaleStorage';

describe('useLocaleStorage', () => {
  const key = 'testKey';

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('get value from localStorage', () => {
    localStorage.setItem(key, 'savedValue');

    const { result } = renderHook(() => useLocaleStorage(key, 'defaultValue'));

    expect(result.current[0]).toBe('savedValue');
  });

  test('get defaultValue from localStorage', () => {
    const { result } = renderHook(() => useLocaleStorage(key, 'defaultValue'));

    expect(result.current[0]).toBe('defaultValue');
    expect(localStorage.getItem(key)).toBe('defaultValue');
  });

  test('call with defaultValue', () => {
    const mockFunc = jest.fn(() => 'computedValue');

    const { result } = renderHook(() => useLocaleStorage(key, mockFunc));

    expect(mockFunc).toHaveBeenCalledTimes(1);
    expect(result.current[0]).toBe('computedValue');
    expect(localStorage.getItem(key)).toBe('computedValue');
  });

  test('update localStorage', () => {
    const { result } = renderHook(() => useLocaleStorage(key, 'initial'));

    act(() => {
      const setName = result.current[1];
      setName('newValue');
    });

    expect(result.current[0]).toBe('newValue');

    expect(localStorage.getItem(key)).toBe('newValue');
  });
});
