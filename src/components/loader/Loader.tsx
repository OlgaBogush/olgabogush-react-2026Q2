import styles from './LoaderStyles.module.css';

import { FC } from 'react';

export const Loader: FC = () => {
  return (
    <div className="flex grow flex-col items-center justify-center self-start p-24">
      <span className={styles.loader} data-testid="loader"></span>
    </div>
  );
};
