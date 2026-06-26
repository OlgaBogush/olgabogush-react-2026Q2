import { NextResponse } from 'next/server';

const headers = ['ID', 'Name', 'Image URL'].join(',');

export async function POST(request: Request) {
  try {
    const favourites = await request.json();

    if (!Array.isArray(favourites) || favourites.length === 0) {
      return new NextResponse('No items selected for export', { status: 400 });
    }

    const rows = favourites.map(({ id, name, image }) => {
      const safeName = name.replace(/"/g, '""');
      return `${id},"${safeName}","${image}"`;
    });

    const csvData = '\uFEFF' + [headers, ...rows].join('\n');

    return new NextResponse(csvData, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="Rick_and_Morty_${favourites.length}_items.csv"`,
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    console.error('Server CSV generation error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
