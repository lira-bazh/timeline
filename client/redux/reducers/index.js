import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import weeks from './weeks'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    weeks
  })

export default createRootReducer
