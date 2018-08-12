/**
 * Created by 30113 on 2018/2/21.
 */
import React from 'react'
import axios from 'axios'
import {message} from 'antd'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {loadData} from '../../redux/user.redux'

@withRouter
@connect(
    null,
    {loadData}
)
class AuthRoute extends React.Component {
    componentDidMount() {
        const publicList = ['/login', '/register']
        const pathname = this.props.location.pathname
        if (publicList.indexOf(pathname) > -1) {
            return null
        }
        axios.get('/api/user/info')
            .then(res => {
                if (res.status === 200) {
                    if (res.data.code === 0) {
                        //有登录信息
                        this.props.loadData(res.data.data)
                    } else {
                        this.props.history.push('./login')
                    }
                }
            })
            .catch(e=>{
                message.error('网络错误')
                //this.props.history.push('./login')
            })
    }
    render() {
        return null
    }
}
export default AuthRoute