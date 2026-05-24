import { FC } from 'react';
import { NavLink, useSearchParams } from 'react-router';

export interface CardProps {
  id: number;
  name: string;
  image: string;
}

export const Card: FC<CardProps> = ({ id, name, image }) => {
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page') || 1;

  return (
    <NavLink
      to={`${id}?page=${currentPage}`}
      className={({ isActive }) =>
        `flex flex-col items-center w-32 p-2 gap-2 border rounded-sm border-gray-300 border-solid cursor-pointer ${isActive ? 'bg-gray-300' : ''}`
      }
    >
      <div className="flex items-center justify-center">
        <img className="rounded-sm" src={image} alt={name} />
      </div>
      <h3 className="text-sm capitalize">{name}</h3>
    </NavLink>
  );
};
