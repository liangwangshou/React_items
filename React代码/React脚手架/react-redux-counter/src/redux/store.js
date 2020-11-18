import {
    composeWithDevTools
} from 'redux-devtools-extension'
import {
    createStore,
    applyMiddleware
} from 'redux'
import thunk from "redux-thunk";
import reducers from "../redux/reducers";
const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunk))
)
export default store