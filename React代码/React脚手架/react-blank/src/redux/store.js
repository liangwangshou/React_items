
// import {composeWithDevTools} from 'redux-devtools-extension'
import {createStore} from 'redux'

import reducers from './reducers'
const store =createStore(reducers);
export default store