import { MouseEvent, FC } from 'react';
import { NavLink, useSearchParams } from 'react-router';

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
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page') || 1;

  const dispatch = useAppDispatch();
  const favouritesCards = useAppSelector(selectFavouritesList);

  const isChecked = favouritesCards.some((item) => item.id === id);

  const handleStopPropagation = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleCheckboxChange = () => {
    dispatch(addItemToFavourites({ id, name, image }));
  };

  return (
    <NavLink
      to={`${id}?page=${currentPage}`}
      className={({ isActive }) =>
        `relative flex flex-col items-center w-32 p-2 pt-9 gap-2 border rounded-sm border-gray-300 border-solid ${isActive ? 'bg-gray-300' : ''}`
      }
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
        <img className="rounded-sm" src={image} alt={name} />
      </div>
      <h3 className="text-sm capitalize">{name}</h3>
    </NavLink>
  );
};
