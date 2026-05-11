import React from 'react';

import styles from './LoaderStyles.module.css';

class Loader extends React.Component {
  render() {
    return <span className={styles.loader} data-testid="loader"></span>;
  }
}
export default Loader;
