import React from 'react';

interface ControlsState {
  value: string;
}

class Search extends React.Component<Record<string, never>, ControlsState> {
  state = { value: '' };

  componentDidMount(): void {
    const userValue: string | null = localStorage.getItem('userValue');
    if (userValue) {
      this.setState({ value: userValue });
    } else this.setState({ value: '' });
  }

  inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: e.target.value });
    localStorage.setItem('userValue', e.target.value);
  };

  render(): React.ReactNode {
    return (
      <div className="flex items-center gap-4 p-4">
        <input
          className="border border-solid"
          type="text"
          name="name"
          value={this.state.value}
          onChange={this.inputHandler}
        />

        <button className="border border-solid cursor-pointer">Search</button>
      </div>
    );
  }
}
export default Search;
