import {createBrowserHistory} from "history";
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {connectRouter, routerMiddleware} from "connected-react-router";
import thunkMiddleware from "redux-thunk";

import {loadFromLocalStorage, saveToLocalStorage} from "./LocalStorage";
import userReducer from "./reducers/userReducer";
import itemsReducer from "./reducers/itemsReducer";
import categoriesReducer from "./reducers/categoriesReducer";

export const history = createBrowserHistory();

const rootReducer = combineReducers({
    router: connectRouter(history),
    user: userReducer,
    item: itemsReducer,
    category: categoriesReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [
    thunkMiddleware,
    routerMiddleware(history)
];

const enhancers = composeEnhancers(applyMiddleware(...middleware));

const persistedState = loadFromLocalStorage();

const store = createStore(rootReducer, persistedState, enhancers);

store.subscribe(() => {
    saveToLocalStorage({
        user: {
            user: store.getState().user.user
        }

    })
});
export default store;