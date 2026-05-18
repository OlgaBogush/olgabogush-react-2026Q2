import { FC } from 'react';

export interface CardProps {
  id: number;
  name: string;
  image: string;
  onCardClick: (id: number) => void;
}

const Card: FC<CardProps> = ({ id, name, image, onCardClick }) => {
  return (
    <div
      onClick={() => onCardClick(id)}
      className="flex flex-col items-center w-32 p-2 gap-2 border rounded-sm border-gray-300 border-solid cursor-pointer"
    >
      <div className="flex items-center justify-center">
        <img className="rounded-sm" src={image} alt={name} />
      </div>
      <h3 className="text-sm capitalize">{name}</h3>
    </div>
  );
};

export default Card;
