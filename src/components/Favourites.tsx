import { FC, useContext } from 'react';
import Image from 'next/image';

import { DataItem } from './CardsList';
import { useAppDispatch } from '../store/hooks';
import { removeAllItems } from '../features/favourites/favouritesSlice';

import { ThemeContext } from '../context/ThemeContext';

interface FavouritesProps {
  favourites: DataItem[] | null;
}

export const Favourites: FC<FavouritesProps> = ({ favourites }) => {
  const dispatch = useAppDispatch();
  const context = useContext(ThemeContext);
  if (!context) {
    return null;
  }
  const { isDarkTheme } = context;
  if (!favourites || favourites.length === 0) return null;

  const handleRemoveButton = () => {
    dispatch(removeAllItems());
  };

  const handleDownloadButton = async () => {
    try {
      const response = await fetch('/api/download-csv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(favourites),
      });

      if (!response.ok) {
        throw new Error('Failed to generate CSV on server');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;

      link.setAttribute(
        'download',
        `Rick_and_Morty_${favourites.length}_items.csv`
      );
      link.style.visibility = 'hidden';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading CSV:', error);
    }
  };

  return (
    <div
      className={`fixed left-4 right-4 bottom-4 z-100 flex flex-col gap-2 p-2 border rounded-sm border-gray-300 max-h-48 overflow-y-auto ${
        isDarkTheme
          ? 'bg-gray-900 text-white border-gray-300'
          : 'bg-white text-gray-900 border-gray-300'
      }`}
    >
      <ul className="flex gap-2 flex-wrap">
        {favourites.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-center gap-2 p-2 border rounded-sm border-gray-300"
          >
            <Image
              className="w-10 border rounded-sm border-gray-300"
              src={item.image}
              alt={item.name}
              height={40}
              width={40}
              priority
            />
            <p className="text-xs capitalize">{item.name}</p>
          </li>
        ))}
      </ul>
      <div className="flex justify-between items-center">
        <p>
          <span>Total: </span>
          {favourites.length}
        </p>
        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            className="flex items-center justify-center min-w-24 h-8 text-base border rounded-sm border-gray-300 cursor-pointer"
            onClick={handleRemoveButton}
          >
            Unselect all
          </button>
          <button
            type="button"
            className="flex items-center justify-center min-w-24 h-8 text-base border rounded-sm border-gray-300 cursor-pointer"
            onClick={handleDownloadButton}
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
};
