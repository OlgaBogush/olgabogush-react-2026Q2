import { DataItem } from '../components/CardsList';

export const downloadFile = (array: DataItem[]): void => {
  const headers = ['ID', 'Name', 'Image URL'].join(',');
  const rows = array.map(({ id, name, image }) => `${id},"${name}","${image}"`);
  const csvData = '\uFEFF' + [headers, ...rows].join('\n');

  const blob = new Blob([csvData], { type: 'text/csv;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;

  link.setAttribute('download', `Rick_and_Morty_${array.length}_items.csv`);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
