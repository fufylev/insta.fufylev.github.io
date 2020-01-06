import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';

import Routes from './Routes';
import { rootReducers } from './rootReducers';
import rootSaga from './rootSaga';
import { BrowserRouter as Router } from 'react-router-dom';

const persistConfig = { key: 'root', storage };
const persistedReducer = persistReducer(persistConfig, rootReducers);
const saga = createSagaMiddleware();

let middleware = [saga, thunk];

if (process.env.NODE_ENV !== 'production') {
    middleware = [...middleware, createLogger()];
}

const store = createStore(persistedReducer, applyMiddleware(...middleware));
const persistor = persistStore(store);

saga.run(rootSaga);

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Router>
                <Routes/>
            </Router>
        </PersistGate>
    </Provider>,
    document.getElementById('root'),
);