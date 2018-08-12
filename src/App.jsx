/**
 * Created by 30113 on 2018/5/5.
 */
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from './pages/login/Login'
import Home from './pages/home/Home'
import { hot } from 'react-hot-loader'
import { Provider } from 'react-redux'
import store from './store'
import AuthRoute from './components/authroute/authroute'

import './App.scss'

class App extends React.Component {
    render() {
        return (
            (
                <Provider store={store}>
                    <BrowserRouter>
                        <React.Fragment>
                            {/* <AuthRoute /> */}
                            <Switch>
                                <Route path="/login" component={Login} />
                                <Route path="/home" component={Home} />
                                <Route component={Home} />
                            </Switch>
                        </React.Fragment>
                    </BrowserRouter>
                </Provider>
            )
        )
    }
}

export default hot(module)(App)