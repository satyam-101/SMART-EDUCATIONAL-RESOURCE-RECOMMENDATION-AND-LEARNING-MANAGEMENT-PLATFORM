import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    try {
      console.error('ErrorBoundary caught:', error.message, info.componentStack);
    } catch {
      // ignore
    }
  }

  handleReset = () => {
    this.setState({ error: null });
  };

  render() {
    if (this.state.error) {
      return (
        <div className="grid min-h-screen place-items-center bg-zuno-950 px-6 text-center">
          <div className="max-w-md">
            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-fuchsia-400">ZUNO hit a snag</p>
            <h1 className="mt-3 text-2xl font-black tracking-[-0.04em] text-white">Something went wrong while rendering the page.</h1>
            <p className="mt-3 break-words rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 font-mono text-xs leading-5 text-zinc-400">
              {this.state.error.message}
            </p>
            <button
              onClick={this.handleReset}
              className="mt-6 rounded-xl bg-violet-500 px-6 py-3 text-sm font-black tracking-wide text-[#fff] transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
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