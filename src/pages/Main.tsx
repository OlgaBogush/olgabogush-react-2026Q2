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
}

class Main extends React.Component<Record<string, never>, MainState> {
  state: MainState = {
    data: [],
    loading: true,
  };

  searchCard = (str: string) => {
    this.setState({ loading: true });
    setTimeout(() => {
      fetch(`https://pokeapi.co/api/v2/pokemon/${str ? str : ''}`).then((res) =>
        res
          .json()
          .then((data) => {
            if (data?.results) {
              this.setState({ data: data.results, loading: false });
            } else {
              this.setState({
                data: [{ name: data.name, url: data.species.url }],
                loading: false,
              });
            }
          })
          .catch((err) => {
            console.log(err);
          })
      );
    }, 3000);
  };

  componentDidMount(): void {
    const userValue: string | null = localStorage.getItem('userValue');
    if (userValue) {
      this.searchCard(userValue);
    } else this.searchCard('');
  }

  render(): React.ReactNode {
    console.log(this.state);

    return (
      <div className="flex flex-col gap-2">
        <Search searchCard={this.searchCard} />
        {this.state.loading ? (
          'loading...'
        ) : (
          <CardsList data={this.state.data} />
        )}
      </div>
    );
  }
}

export default Main;
