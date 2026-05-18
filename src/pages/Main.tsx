import { FC } from 'react';

import CardsList from '../components/CardsList';
import { DataItem } from '../components/CardsList';

interface MainProps {
  data: DataItem[];
}

const Main: FC<MainProps> = ({ data }) => {
  return <CardsList data={data} />;
};

export default Main;
