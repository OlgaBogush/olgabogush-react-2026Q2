import React from 'react';

export interface CardProps {
  name: string;
  url: string;
}

class Card extends React.Component<CardProps> {
  render(): React.ReactNode {
    return (
      <div className="w-64 p-4 border rounded-sm border-gray-300 border-solid">
        <div className="flex items-center justify-center">
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.props.url.split('/').at(-2)}.png`}
            alt={this.props.name}
          />
        </div>
        <h3 className="capitalize">{this.props.name}</h3>
        <p className="text-xs">{this.props.url}</p>
      </div>
    );
  }
}
export default Card;
