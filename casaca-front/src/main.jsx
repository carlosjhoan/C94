import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ApolloProvider } from '@apollo/client/react'
import client from './lib/apollo';
import { FilterProvider } from './context/FilterContext';

createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <StrictMode>
      <FilterProvider>
        <App />
      </FilterProvider>
    </StrictMode>
  </ApolloProvider>
)
