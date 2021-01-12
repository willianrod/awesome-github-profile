import React from 'react';
import PropTypes from 'prop-types';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import '../styles/globals.css';

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false
};

const theme = extendTheme({ config });

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.element,
  pageProps: PropTypes.object
};

export default MyApp;
