import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import boardReducer from './reducers/boardReducer';

const reducers = combineReducers({
  boardReducer
})

const store = createStore(reducers, applyMiddleware(thunk))

export default store