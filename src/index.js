import React from 'react';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import './index.css';
import App from './components/App';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
// import { createContext } from 'react';

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

// we don't need "createContext()" anymore because 'react-redux' package manages all of this by itself.

// export const StoreContext = createContext();
// console.log('Store context', StoreContext);

// // we don't need "Provider" anymore because 'react-redux' package manages all of this by itself.

// class Provider extends React.Component 
// {
//     render () {
//         const {store} = this.props;
//         return <StoreContext.Provider value = {store}>
//             {this.props.children}
//         </StoreContext.Provider>
//     }
// }
// we don't need "connect()" anymore because 'react-redux' package manages all of this by itself.

// const connectedAppComponent = connect(callback)(App);
// export function connect(callback) 
// {
//     return function (Component) {
//         class ConnectedComponent extends React.Component 
//         {
//             constructor(props)
//             {
//                 super(props);
//                 this.unsubscribe = this.props.store.subscribe (() => this.forceUpdate());
//             }

//             componentWillUnmount()
//             {
//                 this.unsubscribe();
//             }
//             render() {
//                 const {store} = this.props;
//                 const state = store.getState();
//                 const dataToBePassedAsProps = callback(state);

//                 return <Component {...dataToBePassedAsProps} 
//                 dispatch = {store.dispatch} />
//             }
//         }

//         class ConnectedComponentWrapper extends React.Component
//         {
//             render () {
//                 return <StoreContext.Consumer>
//                     {(store) => <ConnectedComponent store = {store}/>}
//                 </StoreContext.Consumer>
//             }
//         }
//         return ConnectedComponentWrapper;
//     }
// }



// console.log('BEFORE STATE',store.getState());

// store.dispatch({
//   type : 'ADD_MOVIES',
//   movies : [{ name : 'SUPERMAN'}]
// });

// console.log('AFTER STATE',store.getState());
ReactDOM.render(
    <Provider store = {store}>
        <App/>
    </Provider>,document.getElementById('root')
);