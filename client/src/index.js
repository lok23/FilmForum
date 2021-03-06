import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from "react-router-dom";

import { Provider } from 'react-redux';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import user from "./_reducers/user_reducer";

const rootReducer = combineReducers({user});

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);
ReactDOM.render(
    // window.__REDUX... is used so we can look at redux devtools in the browser
    <Provider
        store={createStoreWithMiddleware(
            rootReducer,
            window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()
        )}
    >
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
