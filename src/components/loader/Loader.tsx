import React from 'react';

import styles from './Loader.module.css';

class Loader extends React.Component {
  render() {
    return <span className={styles.loader}></span>;
  }
}
export default Loader;
