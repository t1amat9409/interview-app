import * as React from 'react';
import './App.css';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { StackOverflowApp } from './components/StackOverflowApp';
import { StackOverflowContextProvider } from './contexts/StackOverflowContext';

const queryClient = new QueryClient()

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <StackOverflowContextProvider>
        <StackOverflowApp />
      </StackOverflowContextProvider>
    </QueryClientProvider>
  );
}

export default App;
