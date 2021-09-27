import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import createReducer from "./rootReducer";

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(createReducer(), composeEnhancers(applyMiddleware(thunk)));