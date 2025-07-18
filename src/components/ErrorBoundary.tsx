import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // You can log error info here if needed
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ color: '#fff', background: '#14213d', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Something went wrong.</h1>
          {this.state.error?.message && (
            <div style={{ background: '#ff0033', color: '#fff', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', maxWidth: '90vw', fontWeight: 'bold', fontSize: '1.1rem' }}>
              {this.state.error.message}
            </div>
          )}
          <pre style={{ color: '#ffb703', background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px', maxWidth: '90vw', overflowX: 'auto' }}>{this.state.error?.stack}</pre>
          <p style={{ marginTop: '2rem', color: '#fff' }}>Please check the console for more details or contact support.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary; 