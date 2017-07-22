import React from 'react';
import {render, unmountComponentAtNode} from 'react-dom';
import {Provider} from 'react-redux';
import {applyMiddleware, compose, createStore} from 'redux';
import {ConnectedRouter, routerMiddleware} from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {createBrowserHistory} from 'history';
import rootReducer from './rootReducer';
import './styles/style.scss';

import Root from './routes';
import {AppContainer} from 'react-hot-loader';

const rootEl = document.getElementById('container');

// Create a history of your choosing (we're using a browser history in this case)
const history = createBrowserHistory();

const loggerMiddleware = createLogger({diff: true});

let middleware = [thunkMiddleware, routerMiddleware(history)]; // middleware on both prod & dev is currently none

if (process.env.NODE_ENV !== 'production') {
  middleware = [...middleware, loggerMiddleware]; // append dev middleware when not on prod
} else {
  middleware = [...middleware]; // append prod middleware
}

let configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, compose(
    applyMiddleware(...middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));
};

const App = () => {
  render(
    <AppContainer>
      <Provider store={configureStore()}>
        <ConnectedRouter history={history}>
          <div>
            <Root/>
          </div>
        </ConnectedRouter>
      </Provider>
    </AppContainer>,
    rootEl
  );
};

if (module.hot) {
  module.hot.accept('./routes', () => {
    setImmediate(() => {
      // Preventing the hot reloading error from react-router
      unmountComponentAtNode(rootEl);
      App();
    });
  });
}

App();
