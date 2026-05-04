import React from 'react';
import CardsList from '../components/CardsList';
import Search from '../components/Search';

interface DataItem {
  name: string;
  url: string;
}

interface MainState {
  data: DataItem[];
  loading: boolean;
  lastQuery: string | undefined;
  errorMessage: string | undefined;
}

class Main extends React.Component<Record<string, never>, MainState> {
  state: MainState = {
    data: [],
    loading: true,
    lastQuery: undefined,
    errorMessage: undefined,
  };

  componentDidMount(): void {
    const userValue: string | null = localStorage.getItem('userValue');
    if (userValue) {
      this.showCards(userValue.toLowerCase().trim());
    } else this.showCards('');
  }

  showCards = async (str: string) => {
    if (str === this.state.lastQuery) return;
    this.setState({ loading: true, lastQuery: str });

    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${str ? str : ''}`
      );

      if (res.status >= 400 && res.status < 500) {
        this.setState({
          errorMessage:
            'Something went wrong. Please check the entered data and try again.',
        });
        throw new Error(
          'Something went wrong. Check the entered data and try again.'
        );
      } else if (res.status >= 500) {
        this.setState({
          errorMessage: 'The server has failed, please try again later.',
        });
        throw new Error('The server has failed, please try again later.');
      }

      const data = await res.json();

      if (data?.results) {
        this.setState({ data: data.results, errorMessage: undefined });
      } else {
        this.setState({
          data: [{ name: data.name, url: data.species.url }],
          errorMessage: undefined,
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      this.setState({ loading: false });
    }
  };

  render(): React.ReactNode {
    return (
      <div className="flex flex-col gap-2">
        <Search showCards={this.showCards} />
        {this.state.loading ? (
          <div>loading...</div>
        ) : this.state.errorMessage ? (
          <div>{this.state.errorMessage}</div>
        ) : (
          <CardsList data={this.state.data} />
        )}
      </div>
    );
  }
}

export default Main;
