import React from 'react';
import Controls from '../components/Controls';
import CardsList from '../components/CardsList';

class Main extends React.Component {
  render(): React.ReactNode {
    return (
      <div className="flex flex-col items-center gap-8">
        <Controls />
        <CardsList />
      </div>
    );
  }
}

export default Main;
