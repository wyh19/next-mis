import React from 'react'
import { Icon, Modal } from 'antd'
import browserCookies from 'browser-cookies'
import { connect } from 'react-redux'

import { logout } from '../../redux/framework.redux'

@connect(
    null,
    { logout }
)
class HeadToolbar extends React.Component {
    constructor(props) {
        super(props)
        this.handleLogout = this.handleLogout.bind(this)
    }
    handleLogout() {
        Modal.confirm({
            title: '确认',
            content: '将要退出系统，请确认？',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk:() =>{
                browserCookies.erase('userid')
                this.props.logout()
            }
        })
    }
    render() {
        return (
            <div className="head-toolbar">
                <Icon className="logout" type="logout"  title="退出系统" onClick={this.handleLogout} />
            </div>
        )
    }
}
export default HeadToolbar