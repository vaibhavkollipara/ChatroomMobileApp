import { applyMiddleware, createStore } from 'redux';

import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';

import reducers from "./reducers";

const middleware = applyMiddleware(logger,thunkMiddleware);

export default createStore(reducers,middleware);
