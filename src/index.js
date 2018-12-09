import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import * as serviceWorker from './serviceWorker';

import './index.scss';

import App from './components/app';

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);

serviceWorker.unregister();
