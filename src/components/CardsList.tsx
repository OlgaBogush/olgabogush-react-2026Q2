import { FC } from 'react';
import Card from './Card';

export interface DataItem {
  id: number;
  name: string;
  image: string;
}

export interface CardsListProps {
  data: DataItem[];
  onCardClick: (id: number) => void;
}

const CardsList: FC<CardsListProps> = ({ data, onCardClick }) => {
  return (
    <div className="flex flex-col gap-4">
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {data.map((item) => (
          <Card
            key={item.id}
            id={item.id}
            name={item.name}
            image={item.image}
            onCardClick={onCardClick}
          />
        ))}
      </ul>
    </div>
  );
};

export default CardsList;
