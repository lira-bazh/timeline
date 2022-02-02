import { combineReducers } from 'redux'
import weeks from './weeks.js'

const createRootReducer = () =>
  combineReducers({
    weeks
  })

export default createRootReducer
