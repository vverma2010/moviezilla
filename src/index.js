import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import './index.css';
import App from './components/App';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

// const logger = function({dispatch, getState})
// {
//     return function(next)
//     {
//         return function(action)
//         {
//             console.log('ACTION_TYPE: ' ,action.type);
//             next(action);
//         }
//     }
// }

// we can call above middleware using the method we used below. It is called "implicit return"
const logger = ({dispatch, getState}) => (next) => (action) => {
    if(typeof action !== 'function')
    {
        console.log('ACTION_TYPE: ' ,action.type);
    }
    next(action);
}

// const thunk = ({dispatch, getState}) => (next) => (action) => {
//     if (typeof action === 'function')
//     {
//         console.log('thunk');
//         action (dispatch);
//         return;
//     }
//     next(action);
// }

const store = createStore(rootReducer, applyMiddleware(logger, thunk));
console.log('store',store);
// console.log('BEFORE STATE',store.getState());

// store.dispatch({
//   type : 'ADD_MOVIES',
//   movies : [{ name : 'SUPERMAN'}]
// });

// console.log('AFTER STATE',store.getState());
ReactDOM.render(<App store ={store} />,document.getElementById('root'));