import { FC } from 'react';

export interface CardProps {
  name: string;
  image: string;
}

const Card: FC<CardProps> = ({ name, image }) => {
  return (
    <li className="flex flex-col items-center justify-center w-64 p-4 gap-2 border rounded-sm border-gray-300 border-solid cursor-pointer">
      <div className="flex items-center justify-center">
        <img className="rounded-sm" src={image} alt={name} />
      </div>
      <h3 className="capitalize">{name}</h3>
    </li>
  );
};

export default Card;
