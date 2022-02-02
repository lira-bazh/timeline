import { createStore } from 'redux'
import rootReducer from './reducers/index.js'

const initialState = {}

let store = createStore(rootReducer(), initialState)

export default store