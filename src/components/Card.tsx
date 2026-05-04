import React from 'react';

interface CardProps {
  name: string;
  url: string;
}

class Card extends React.Component<CardProps> {
  render(): React.ReactNode {
    return (
      <div className="w-64 p-4 border border-solid">
        <h3 className="capitalize">{this.props.name}</h3>
        <p className="text-xs">{this.props.url}</p>
      </div>
    );
  }
}
export default Card;
