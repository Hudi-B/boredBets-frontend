import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import stores from './store/stores';
import { SnackbarProvider } from 'notistack';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SnackbarProvider maxSnack={6}>
    <Provider store={stores}>
      <App />
    </Provider>
  </SnackbarProvider>
);
