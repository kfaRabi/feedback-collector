import 'materialize-css/dist/css/materialize.min.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';
// store is the main state that can be accessed by any child component in our applicatin
// Provider will be our Highest Component and it will have store as its props
const reduxStore = createStore( reducers, {/*server related rendering*/}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store = { reduxStore }>
    <App />
  </Provider>
  , document.querySelector("#root")
);