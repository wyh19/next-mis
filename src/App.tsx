import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'mobx-react';
import * as stores from './store';
import { hot } from 'react-hot-loader'
import Home from './page/home/Home'
import Login from './page/login/Login'


class App extends React.Component {
    public render() {
        return (
            <Provider store={stores}>
                <BrowserRouter>
                    <Switch>
                        <Route path='/login' component={Login} />
                        <Route path='/home' component={Home} />
                    </Switch>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default hot(module)(App);
