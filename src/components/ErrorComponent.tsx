import { FC, useEffect } from 'react';

export const ErrorComponent: FC = () => {
  useEffect(() => {
    throw new Error('Test error for errorboundary');
  }, []);

  return null;
};
