import React from 'react';

class ErrorComponent extends React.Component {
  componentDidMount() {
    throw new Error('Test error for errorboundary');
  }

  render(): React.ReactNode {
    return null;
  }
}

export default ErrorComponent;
