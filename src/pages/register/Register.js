/**
 * Created by 30113 on 2018/6/6.
 */
import React from 'react'
import {connect} from 'react-redux'
import {Redirect}from 'react-router-dom'
import {register} from '../../redux/user.redux'

import valueControl from '../../components/value-control/value-control'

@connect(
    state => state.user,
    {register}
)
@valueControl
class Register extends React.Component {
    constructor(props) {
        super(props)
        this.handleRegister = this.handleRegister.bind(this)
        this.reset = this.reset.bind(this)
    }

    handleRegister() {
        this.props.register(this.props.state)
    }

    reset() {

    }

    render() {
        return (
            <div>
                {this.props.redirectTo?<Redirect to={this.props.redirectTo}/>:null}
                {this.props.msg?<h2>{this.props.msg}</h2>:null}
                <h2>注册页</h2>
                <div>
                    <label>用户名</label>
                    <input type="text"
                           onChange={v => this.props.onChange('user', v.target.value)}
                    />
                </div>
                <div>
                    <label>密码</label>
                    <input type="password"
                           onChange={v => this.props.onChange('pwd', v.target.value)}
                    />
                </div>
                <div>
                    <label>确认密码</label>
                    <input type="password"
                           onChange={v => this.props.onChange('repwd', v.target.value)}
                    />
                </div>
                <div>
                    <button onClick={this.handleRegister}>注册</button>
                    <button onClick={this.reset}>重置</button>
                </div>
            </div>
        )
    }
}



export default Register