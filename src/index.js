import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import client from './apollo';
import { ApolloProvider } from '@apollo/react-hooks';

ReactDOM.render(<ApolloProvider client={client}><App /></ApolloProvider>, document.getElementById('root'));
