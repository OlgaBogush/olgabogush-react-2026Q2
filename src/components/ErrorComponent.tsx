import { FC, useEffect } from 'react';

const ErrorComponent: FC = () => {
  useEffect(() => {
    throw new Error('Test error for errorboundary');
  }, []);

  return null;
};

export default ErrorComponent;
