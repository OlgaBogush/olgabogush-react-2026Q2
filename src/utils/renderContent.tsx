import { ReactNode } from 'react';
import { Outlet } from 'react-router';

import { Loader } from '../components/loader/Loader';
import { CardsList, DataItem } from '../components/CardsList';

interface RenderContentProps {
  data: { results: DataItem[] } | undefined;
  filteredData: DataItem[];
  isLoading: boolean;
  isFetching: boolean;
}

export const renderContent = ({
  data,
  filteredData,
  isLoading,
  isFetching,
}: RenderContentProps): ReactNode => {
  if (isLoading || isFetching) {
    return <Loader />;
  }
  if (data?.results.length) {
    return (
      <>
        <CardsList data={filteredData} />
        <Outlet />
      </>
    );
  }
  return null;
};
