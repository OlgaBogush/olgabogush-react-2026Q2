import showCards from '../api/showCards';

const mockFetch = jest.fn() as jest.MockedFunction<typeof globalThis.fetch>;

(globalThis as unknown as { fetch: unknown }).fetch = mockFetch;

describe('showCards', () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  test('get results', async () => {
    const mockResponseData = {
      results: [{ id: 1, name: 'Rick Sanchez' }],
    };

    mockFetch.mockResolvedValueOnce({
      status: 200,
      json: async () => mockResponseData,
    } as Response);

    const result = await showCards(1);

    expect(mockFetch).toHaveBeenCalled();
    expect(result).toEqual(mockResponseData.results);
  });

  test('error 404', async () => {
    mockFetch.mockResolvedValueOnce({
      status: 404,
    } as Response);

    await expect(showCards(1)).rejects.toThrow(
      'Something went wrong. No data was found, please, try again later.'
    );
    expect(consoleSpy).toHaveBeenCalled();
  });

  test('error 500', async () => {
    mockFetch.mockResolvedValueOnce({
      status: 500,
    } as Response);

    await expect(showCards(1)).rejects.toThrow(
      'The server has failed, please, try again later.'
    );
    expect(consoleSpy).toHaveBeenCalled();
  });

  test('catch err', async () => {
    const networkError = new Error('Network Error');
    mockFetch.mockRejectedValueOnce(networkError);

    await expect(showCards(1)).rejects.toThrow('Network Error');
    expect(consoleSpy).toHaveBeenCalledWith(networkError);
  });
});
