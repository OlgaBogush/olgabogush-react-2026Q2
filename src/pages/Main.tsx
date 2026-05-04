import React from 'react';
import CardsList from '../components/CardsList';
import Search from '../components/Search';
import Card from '../components/Card';

interface DataItem {
  name: string;
  url: string;
}

interface PokemonItem {
  id: number;
  name: string;
  url: string;
}

interface MainState {
  data: DataItem[];
  pokemon: PokemonItem | null;
}

class Main extends React.Component<Record<string, never>, MainState> {
  state: MainState = {
    data: [],
    pokemon: null,
  };

  async componentDidMount() {
    const userValue: string | null = localStorage.getItem('userValue');
    if (userValue) {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${userValue}`
        );
        const data = await response.json();
        this.setState({
          pokemon: {
            id: data.id,
            name: data.name,
            url: data.species.url,
          },
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/');
        const data = await response.json();
        this.setState({ data: data.results });
      } catch (err) {
        console.log(err);
      }
    }
  }

  render(): React.ReactNode {
    console.log(this.state);

    return (
      <div className="flex flex-col gap-2">
        <Search />
        {!!this.state.pokemon && (
          <div className="flex flex-wrap gap-4 p-4">
            <Card name={this.state.pokemon.name} url={this.state.pokemon.url} />
          </div>
        )}
        {this.state.data.length !== 0 && <CardsList data={this.state.data} />}
      </div>
    );
  }
}

export default Main;
