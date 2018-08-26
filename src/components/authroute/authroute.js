import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { authCheck } from '../../redux/auth.redux'

@withRouter
@connect(
    null,
    { authCheck }
)
class AuthRoute extends React.Component {
    componentDidMount() {
        const publicList = ['/login']
        const pathname = this.props.location.pathname
        if (publicList.indexOf(pathname) > -1) {
            return null
        }
        const loginname = sessionStorage.getItem('loginname')
        const password = sessionStorage.getItem('password')
        this.props.authCheck(loginname,password)
    }
    render() {
        return null
    }
}
export default AuthRoute