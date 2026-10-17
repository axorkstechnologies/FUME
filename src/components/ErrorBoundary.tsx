import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[FUME] Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FDFBF7] text-[#1A1A1A] flex flex-col items-center justify-center p-6 text-center font-sans">
          <div className="max-w-md space-y-6">
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#8C2D19] font-medium block">
              FUME FRAGRANCES &bull; ATELIER NOTICE
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl uppercase tracking-[0.16em] text-[#1A1A1A]">
              SANCTUARY RESTORATION
            </h1>
            <p className="text-xs uppercase tracking-widest text-[#1A1A1A]/70 leading-relaxed font-sans">
              An unexpected interruption occurred while preparing your olfactory experience. Please refresh to restore the collection.
            </p>
            <div className="pt-4">
              <button
                onClick={this.handleReload}
                className="px-8 py-3.5 bg-[#1A1A1A] text-[#FDFBF7] text-[10px] uppercase tracking-[0.28em] font-sans font-semibold hover:bg-[#8C2D19] transition-colors duration-300 cursor-pointer"
              >
                RESTORE EXPERIENCE
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
