import styles from './LoaderStyles.module.css';

import { FC } from 'react';

const Loader: FC = () => {
  return <span className={styles.loader} data-testid="loader"></span>;
};

export default Loader;
