import React, { type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <h1 className="flex flex-col gap-6 p-6 items-center justify-center">
          An error has occurred. You can refresh the page to start over.
        </h1>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
