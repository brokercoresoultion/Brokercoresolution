import React from 'react';
import { AlertTriangle } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0B0B0B] text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6">
            <AlertTriangle className="text-red-500 w-10 h-10" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-white">
            System Fault Detected
          </h1>
          <p className="text-gray-400 max-w-lg mb-8 leading-relaxed">
            Our platform has encountered an unexpected runtime error. We have logged the issue and our engineering team will resolve it shortly.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-4 bg-gray-900 text-white hover:bg-gray-800 font-bold rounded-xl transition-all border border-white/10"
          >
            Reboot System
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
