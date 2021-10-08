import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import createReducer from "./rootReducer";
import history from "../history";

const thunkMiddlewareWithArg = thunk.withExtraArgument(history);
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(createReducer(), composeEnhancers(applyMiddleware(thunkMiddlewareWithArg)));