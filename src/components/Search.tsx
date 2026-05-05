import React from 'react';
import ErrorComponent from './ErrorComponent';

interface SearchProps {
  showCards: (str: string) => void;
}

interface SearchState {
  value: string;
  shouldCrash: boolean;
}

class Search extends React.Component<SearchProps, SearchState> {
  state = { value: '', shouldCrash: false };

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

  keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      this.props.showCards(this.state.value.toLowerCase().trim());
    }
  };

  render(): React.ReactNode {
    return (
      <div className="flex items-center gap-4 p-4">
        {this.state.shouldCrash && <ErrorComponent />}
        <input
          className="border border-solid"
          type="text"
          name="name"
          value={this.state.value}
          onChange={this.inputHandler}
          onKeyDown={this.keyDownHandler}
        />

        <button
          className="border border-solid cursor-pointer"
          onClick={() =>
            this.props.showCards(this.state.value.toLowerCase().trim())
          }
        >
          Search
        </button>

        <button
          className="border border-solid cursor-pointer"
          onClick={() => this.setState({ shouldCrash: true })}
        >
          Test
        </button>
      </div>
    );
  }
}
export default Search;
