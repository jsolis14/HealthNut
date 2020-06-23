import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import profileInfo from './profile'
import foods from './foods';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
    profileInfo,
    foods,

});

const configureStore = () => {
    return createStore(reducer, {}, composeEnhancers(applyMiddleware(thunk)));
};

export default configureStore;
