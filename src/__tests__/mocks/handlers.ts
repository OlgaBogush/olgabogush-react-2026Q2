import { http, HttpResponse } from 'msw';
import { BASE_URL } from '../../utils/constants';

export const handlers = [
  http.get(`${BASE_URL}`, ({ request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get('page');

    if (page === '19999999') {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json({
      results: [
        { id: 1, name: 'Rick Sanchez', image: 'rick-1.jpeg' },
        { id: 2, name: 'Morty Smith', image: 'rick-2.jpeg' },
      ],
    });
  }),
];
