import { combineReducers, createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import videosReducer from './videos_reducer';

const rootReducer = combineReducers({
  videos: videosReducer,
});

const store = createStore(
  rootReducer,
  {},
  applyMiddleware(thunk, createLogger({ collapsed: true }))
);

export default store;
