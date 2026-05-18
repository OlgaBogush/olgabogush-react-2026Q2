import { FC } from 'react';
import Card from './Card';

export interface DataItem {
  id: number;
  name: string;
  image: string;
}

interface CardsListProps {
  data: DataItem[];
}

const CardsList: FC<CardsListProps> = ({ data }) => {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {data.map((item) => (
        <Card key={item.id} name={item.name} image={item.image} />
      ))}
    </ul>
  );
};

export default CardsList;
