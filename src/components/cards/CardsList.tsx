import React from 'react';
import Card from './Card';

class CardsList extends React.Component {
  render(): React.ReactNode {
    return (
      <div className="flex flex-col gap-8">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    );
  }
}
export default CardsList;
