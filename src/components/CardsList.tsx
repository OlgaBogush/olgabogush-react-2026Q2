import React from 'react';
import Card from './Card';

interface DataItem {
  name: string;
  url: string;
}

interface CardsListProps {
  data: DataItem[];
}

class CardsList extends React.Component<CardsListProps> {
  render(): React.ReactNode {
    return (
      <div className="flex flex-wrap gap-4 p-4">
        {this.props.data.map((item) => (
          <Card key={item.name} name={item.name} url={item.url} />
        ))}
      </div>
    );
  }
}
export default CardsList;
