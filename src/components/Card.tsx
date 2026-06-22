'use client';

import { MouseEvent, FC } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

import { useAppDispatch, useAppSelector } from '../store/hooks';

import {
  addItemToFavourites,
  selectFavouritesList,
} from '../features/favourites/favouritesSlice';

export interface CardProps {
  id: number;
  name: string;
  image: string;
}

export const Card: FC<CardProps> = ({ id, name, image }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = searchParams?.get('page') || 1;
  const currentName = searchParams?.get('name') || '';

  const dispatch = useAppDispatch();
  const favouritesCards = useAppSelector(selectFavouritesList);

  const isActive = searchParams?.get('id') === String(id);
  const isChecked = favouritesCards.some((item) => item.id === id);

  const handleStopPropagation = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleCheckboxChange = () => {
    dispatch(addItemToFavourites({ id, name, image }));
  };

  const handleCardClick = () => {
    const queryParams = new URLSearchParams(searchParams?.toString());
    queryParams.set('page', String(currentPage));
    queryParams.set('id', String(id));

    if (currentName) queryParams.set('name', currentName);
    router.push(`/?${queryParams.toString()}`, { scroll: false });
  };

  return (
    <div
      onClick={handleCardClick}
      className={`relative flex flex-col items-center w-32 p-2 pt-9 gap-2 border rounded-sm border-gray-300 border-solid ${isActive ? 'bg-gray-300' : ''}`}
    >
      <div
        className="absolute top-2 right-2 z-10 w-5 h-5 flex items-center justify-center"
        onClick={handleStopPropagation}
      >
        <input
          type="checkbox"
          onChange={handleCheckboxChange}
          checked={isChecked}
        />
      </div>
      <div className="flex items-center justify-center">
        <Image
          className="rounded-sm"
          src={image}
          alt={name}
          height={128}
          width={128}
          priority
        />
      </div>
      <h3 className="text-sm capitalize">{name}</h3>
    </div>
  );
};
