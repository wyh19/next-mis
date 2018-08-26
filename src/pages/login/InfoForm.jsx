import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import { connect } from 'react-redux'
import { login, clearMsg, setForm } from '../../redux/auth.redux'

const { create, Item } = Form

@connect(
    state => state.auth,
    { login, clearMsg, setForm }
)
@create({
    mapPropsToFields(props) {
        if (props.remember) {
            let fields = {}
            fields['loginname'] = Form.createFormField({
                value: props['username']
            })
            fields['password'] = Form.createFormField({
                value: props['password']
            })
            fields['remember'] = Form.createFormField({
                value: props['remember']
            })
            return fields
        }
    }
})
class InfoForm extends Component {
    componentDidMount() {
        let remember = localStorage.getItem('remember')
        remember = remember === 'true' ? true : false
        const loginname = localStorage.getItem('loginname')
        const password = localStorage.getItem('password')
        this.props.setForm({ loginname, password, remember })
    }
    componentDidUpdate() {
        if (this.props.msg) {
            message.error(this.props.msg)
            this.props.clearMsg()
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.login(values)
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className='login-form'>
                <div className='login-form-title'>
                苗建信息数据处理中心
                </div>
                <Item>
                    {getFieldDecorator('loginname', {
                        rules: [{ required: true, message: '请输入用户名!' }],
                    })(
                        <Input size='large' prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='用户名' />
                    )}
                </Item>
                <Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码!' }],
                    })(
                        <Input size='large' prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />} type='password' placeholder='密码' />
                    )}
                </Item>
                <Item>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                    })(
                        <Checkbox >记住我</Checkbox>
                    )}
                </Item>
                <Button size='large' type='primary' htmlType='submit' className='login-form-button'>
                    登录
                </Button>
            </Form>
        );
    }
}


export default InfoForm