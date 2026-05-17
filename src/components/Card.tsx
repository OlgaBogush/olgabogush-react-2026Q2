import { FC } from 'react';

export interface CardProps {
  name: string;
  url: string;
}

const Card: FC<CardProps> = ({ name, url }) => {
  const urlArray = url.split('/');
  const id = urlArray[urlArray.length - 2];
  return (
    <li className="w-64 p-4 border rounded-sm border-gray-300 border-solid">
      <div className="flex items-center justify-center">
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
          alt={name}
        />
      </div>
      <h3 className="capitalize">{name}</h3>
      <p className="text-xs">{url}</p>
    </li>
  );
};

export default Card;
