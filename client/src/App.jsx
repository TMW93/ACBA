import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from '@apollo/client';
import {ApolloProvider} from '@apollo/client/react'
import {Outlet} from 'react-router-dom';
import './App.css'

const httpLink = new HttpLink({
  url: '/graphql',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <Outlet />
      </div>
    </ApolloProvider>
  )
}

export default App
