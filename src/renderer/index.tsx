import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import React from 'react';
import App from './App';
import { store } from './redux/store';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
