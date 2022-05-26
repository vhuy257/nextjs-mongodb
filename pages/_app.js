import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import {
  ApolloProvider,
} from '@apollo/client';
import client from '../apollo-client';

export default function MyApp({ Component, pageProps }) {  
  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  )
}