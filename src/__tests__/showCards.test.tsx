import showCards from '../api/showCards';

describe('showCards', () => {
  let fetchSpy: jest.SpyInstance;

  beforeEach(() => {
    fetchSpy = jest.spyOn(globalThis, 'fetch');
  });

  test('get results', async () => {
    const mockResponseData = {
      results: [{ id: 1, name: 'Rick Sanchez' }],
    };

    fetchSpy.mockResolvedValueOnce({
      status: 200,
      json: async () => mockResponseData,
    } as Response);

    const result = await showCards(1);

    expect(fetchSpy).toHaveBeenCalled();
    expect(result).toEqual(mockResponseData.results);
  });

  test('error 404', async () => {
    fetchSpy.mockResolvedValueOnce({
      status: 404,
    } as Response);

    await expect(showCards(1)).rejects.toThrow(
      'Something went wrong. No data was found, please, try again later.'
    );
  });

  test('error 500', async () => {
    fetchSpy.mockResolvedValueOnce({
      status: 500,
    } as Response);

    await expect(showCards(1)).rejects.toThrow(
      'The server has failed, please, try again later.'
    );
  });

  test('catch err', async () => {
    const networkError = new Error('Network Error');
    fetchSpy.mockRejectedValueOnce(networkError);

    await expect(showCards(1)).rejects.toThrow('Network Error');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
