import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducer'


const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
))

//参考https://github.com/reduxjs/react-redux/releases/tag/v2.0.0
if (module.hot) {
    module.hot.accept('./reducer', () => {
        const nextRootReducer = require('./reducer').default
        store.replaceReducer(nextRootReducer);
    });
}
export default store