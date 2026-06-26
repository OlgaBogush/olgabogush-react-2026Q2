import { ReactNode } from 'react';

import { Loader } from '../components/loader/Loader';
import { CardsList, DataItem } from '../components/CardsList';
import { SingleCard } from '../components/SingleCard';

export interface RenderContentProps {
  data: { results: DataItem[] } | undefined | null;
  filteredData: DataItem[];
  isLoading: boolean;
  isFetching: boolean;
  activeId?: string | string[];
}

export const renderContent = ({
  data,
  filteredData,
  isLoading,
  isFetching,
  activeId,
}: RenderContentProps): ReactNode => {
  if (isLoading || isFetching) {
    return <Loader />;
  }
  if (data?.results.length) {
    return (
      <div className="flex gap-6 w-full items-start justify-between">
        <div className="flex-1">
          <CardsList data={filteredData} />
        </div>

        {activeId && (
          <div className="w-64 sticky top-4">
            <SingleCard />
          </div>
        )}
      </div>
    );
  }
  return null;
};
