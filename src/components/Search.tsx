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
    localStorage.setItem('userValue', e.target.value.toLowerCase().trim());
  };

  keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      this.props.showCards(this.state.value.toLowerCase().trim());
    }
  };

  render(): React.ReactNode {
    return (
      <div className="flex items-center flex-col sm:flex-row  gap-4 p-4 border rounded-sm border-gray-300 border-solid">
        {this.state.shouldCrash && <ErrorComponent />}
        <input
          className="p-1 w-56 border rounded-sm border-gray-300 border-solid"
          type="text"
          name="name"
          value={this.state.value}
          onChange={this.inputHandler}
          onKeyDown={this.keyDownHandler}
        />

        <button
          className="p-1 w-56 sm:w-30 cursor-pointer border rounded-sm border-gray-300 border-solid"
          onClick={() =>
            this.props.showCards(this.state.value.toLowerCase().trim())
          }
        >
          Search
        </button>

        <button
          className="p-1 w-56 sm:w-30 cursor-pointer border rounded-sm border-gray-300 border-solid"
          onClick={() => this.setState({ shouldCrash: true })}
        >
          Test
        </button>
      </div>
    );
  }
}
export default Search;
