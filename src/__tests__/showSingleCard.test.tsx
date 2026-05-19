import showSingleCard from '../api/showSingleCard';

const mockFetch = jest.fn() as jest.MockedFunction<typeof globalThis.fetch>;

(globalThis as unknown as { fetch: unknown }).fetch = mockFetch;

describe('Функция API showSingleCard', () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  test('get data', async () => {
    const mockCharacter = { id: 1, name: 'Rick Sanchez', status: 'Alive' };

    mockFetch.mockResolvedValueOnce({
      status: 200,
      json: async () => mockCharacter,
    } as Response);

    const result = await showSingleCard(1);

    expect(mockFetch).toHaveBeenCalled();
    expect(result).toEqual(mockCharacter);
  });

  test('error 404', async () => {
    mockFetch.mockResolvedValueOnce({
      status: 404,
    } as Response);

    const result = await showSingleCard(1);

    expect(result).toBeUndefined();
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'The character was not found, please, try again later.',
      })
    );
  });

  test('error 500', async () => {
    mockFetch.mockResolvedValueOnce({
      status: 500,
    } as Response);

    const result = await showSingleCard(1);

    expect(result).toBeUndefined();
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'The server has failed, please, try again later.',
      })
    );
  });

  test('catch err', async () => {
    const networkError = new Error('Network request failed');
    mockFetch.mockRejectedValueOnce(networkError);

    const result = await showSingleCard(1);

    expect(result).toBeUndefined();
    expect(consoleSpy).toHaveBeenCalledWith(networkError);
  });
});
