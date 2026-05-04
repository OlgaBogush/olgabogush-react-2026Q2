import React from 'react';

interface ControlsState {
  value: string;
}

class Controls extends React.Component<Record<string, never>, ControlsState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = { value: '' };
  }
  inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: e.target.value });
  };

  render(): React.ReactNode {
    return (
      <div className="flex gap-8 border border-solid">
        <input
          className="border border-solid"
          type="text"
          name="name"
          value={this.state.value}
          onChange={this.inputHandler}
        />
        <button>Search</button>
      </div>
    );
  }
}
export default Controls;
