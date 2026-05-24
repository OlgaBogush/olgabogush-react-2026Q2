import styles from './LoaderStyles.module.css';

import { FC } from 'react';

export const Loader: FC = () => {
  return <span className={styles.loader} data-testid="loader"></span>;
};
