import { downloadFile } from '../utils/downloadFile';

describe('downloadFile', () => {
  beforeEach(() => {
    window.URL.createObjectURL = vi.fn(() => 'blob:http://localhost/mock-uuid');
    window.URL.revokeObjectURL = vi.fn();

    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('create CSV', () => {
    const mockData = [
      { id: 1, name: 'Rick Sanchez', image: 'rick.jpeg' },
      { id: 2, name: 'Morty Smith', image: 'morty.jpeg' },
    ];

    const appendSpy = vi.spyOn(document.body, 'appendChild');

    downloadFile(mockData);

    expect(appendSpy).toHaveBeenCalled();

    const createdLink = appendSpy.mock.calls[0][0] as HTMLAnchorElement;

    expect(createdLink.getAttribute('download')).toBe(
      'Rick_and_Morty_2_items.csv'
    );

    expect(createdLink.href).toBe('blob:http://localhost/mock-uuid');

    expect(HTMLAnchorElement.prototype.click).toHaveBeenCalled();
  });
});
