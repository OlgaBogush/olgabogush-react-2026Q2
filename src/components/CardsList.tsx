import React from 'react';
import Card from './Card';

export interface DataItem {
  name: string;
  url: string;
}

interface CardsListProps {
  data: DataItem[];
}

class CardsList extends React.Component<CardsListProps> {
  render(): React.ReactNode {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {this.props.data.map((item) => (
          <Card key={item.name} name={item.name} url={item.url} />
        ))}
      </div>
    );
  }
}
export default CardsList;
