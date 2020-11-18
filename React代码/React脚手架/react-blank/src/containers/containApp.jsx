import {connect} from 'react-redux'
import {handleAdd,handleDel} from '../redux/action'
import App from '../components/app'
export default connect(
    (state)=>({
        comments:state
    }),
    {handleAdd,handleDel}
)(App);