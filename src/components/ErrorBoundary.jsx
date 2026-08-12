import { Component } from 'react';
import StateNotice from './StateNotice';

/** Catches render failures anywhere below it and shows the 500 surface instead of a blank page. */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    if (import.meta.env.DEV) {
      console.error('Render error captured by ErrorBoundary:', error);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="mx-auto flex min-h-screen max-w-[1400px] items-center justify-center px-5">
          <StateNotice
            state="server"
            showMark
            title="Something went wrong"
            message="The page could not be displayed. Reload to try again, or call the spa on +264 85 607 7143."
            actionLabel="Reload"
            onAction={() => window.location.reload()}
          />
        </main>
      );
    }
    return this.props.children;
  }
}
