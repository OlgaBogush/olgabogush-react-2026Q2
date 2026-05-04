import React from 'react';
import Controls from './components/controls/Controls';
import CardsList from './components/cards/CardsList';

class App extends React.Component {
  render(): React.ReactNode {
    return (
      <div className="flex flex-col items-center gap-8">
        <Controls />
        <CardsList />
      </div>
    );
  }
}

export default App;
