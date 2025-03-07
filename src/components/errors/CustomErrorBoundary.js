import React, { Component } from 'react';
class CustomErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError = error => ({ hasError: true });
  componentDidCatch = (error, errorInfo) => console.error('Error caught by error boundary:', error, errorInfo);
  render() {
    return this.state.hasError ? <h1>Something went wrong.{this.state.hasError}</h1> : this.props.children;
  }
}
export default CustomErrorBoundary;
