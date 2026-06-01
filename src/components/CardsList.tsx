import { FC } from 'react';
import { Card } from './Card';

export interface DataItem {
  id: number;
  name: string;
  image: string;
}

export interface CardsListProps {
  data: DataItem[];
}

export const CardsList: FC<CardsListProps> = ({ data }) => {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-items-center">
      {data.map(({ id, name, image }) => (
        <Card key={id} id={id} name={name} image={image} />
      ))}
    </ul>
  );
};
