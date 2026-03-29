'use client';

import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  handleReset = () => {
    this.setState({ hasError: false });
    this.props.onReset?.();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex-1 flex items-center justify-center bg-[#eae6df] p-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm text-center shadow-lg">
            <div className="text-4xl mb-4">&#x26A0;&#xFE0F;</div>
            <h2 className="text-lg font-medium text-[#111b21] mb-2">Something went wrong</h2>
            <p className="text-sm text-[#667781] mb-6">
              The chat viewer encountered an error. This might happen with unsupported file formats.
            </p>
            <button
              onClick={this.handleReset}
              className="bg-[#00a884] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#008f72] transition-colors"
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
