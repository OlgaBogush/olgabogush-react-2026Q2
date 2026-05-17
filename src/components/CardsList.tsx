import { FC } from 'react';
import Card from './Card';

export interface DataItem {
  name: string;
  url: string;
}

interface CardsListProps {
  data: DataItem[];
}

const CardsList: FC<CardsListProps> = ({ data }) => {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((item) => (
        <Card key={item.name} name={item.name} url={item.url} />
      ))}
    </ul>
  );
};

export default CardsList;
