import React, { PureComponent } from 'react'
import { Row, Col, Form, Input, Select, InputNumber, Radio, DatePicker } from 'antd'
import moment from 'moment';
import { connect } from 'react-redux'

const { Item, create } = Form
const { Option } = Select
@create({
    mapPropsToFields(props) {
        if (props.formType === 'update') {
            let fields = {}
            for (let key in props.formData) {
                fields[key] = Form.createFormField({
                    value: props.formData[key]
                })
                if (key === 'birthday') {
                    fields[key] = Form.createFormField({
                        value: moment(props.formData[key], 'YYYY-MM-DD')
                    })
                }
            }
            return fields
        }
    }
})
@connect(
    state => state.userinfo
)
class InfoForm extends PureComponent {
    render() {
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 18 },
            },
        }
        const { formType, form } = this.props
        const { getFieldDecorator } = form
        return (
            <Form>
                {
                    formType === 'update' ? <Item>
                        {getFieldDecorator('id')(
                            <Input type='hidden' />
                        )}
                    </Item> : null
                }
                <Row>
                    <Col span={12}>
                        <Item
                            {...formItemLayout}
                            label='用户名'
                            hasFeedback
                        >
                            {getFieldDecorator('name', {
                                rules: [{
                                    required: true, message: '用户名不能为空',
                                }],
                            })(
                                <Input />
                            )}
                        </Item>
                    </Col>
                    <Col span={12}>
                        <Item
                            {...formItemLayout}
                            label='姓名'
                            hasFeedback
                        >
                            {getFieldDecorator('realname', {
                                rules: [{
                                    required: true, message: '姓名不能为空',
                                }],
                            })(
                                <Input />
                            )}
                        </Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Item
                            {...formItemLayout}
                            label='密码'
                            hasFeedback
                        >
                            {getFieldDecorator('password', {
                                rules: [{
                                    required: true, message: '密码不能为空',
                                }],
                            })(
                                <Input />
                            )}
                        </Item>
                    </Col>
                    <Col span={12}>
                        <Item
                            {...formItemLayout}
                            label='状态'
                            hasFeedback
                        >
                            {getFieldDecorator('status', {
                                rules: [{
                                    required: true, message: '状态不能为空',
                                }],
                            })(
                                <Radio.Group>
                                    <Radio value={0}>启用</Radio>
                                    <Radio value={1}>停用</Radio>
                                </Radio.Group>
                            )}
                        </Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Item
                            {...formItemLayout}
                            label='性别'
                            hasFeedback
                        >
                            {getFieldDecorator('gender', {
                                rules: [{
                                    required: true, message: '性别不能为空',
                                }],
                            })(
                                <Radio.Group>
                                    <Radio value={1}>男</Radio>
                                    <Radio value={2}>女</Radio>
                                </Radio.Group>
                            )}
                        </Item>
                    </Col>
                    <Col span={12}>
                        <Item
                            {...formItemLayout}
                            label='年龄'
                            hasFeedback
                        >
                            {getFieldDecorator('age', {
                                rules: [{
                                    required: true, message: '年龄不能为空',
                                }],
                            })(
                                <InputNumber min={18} max={100} />
                            )}
                        </Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Item
                            {...formItemLayout}
                            label='生日'
                            hasFeedback
                        >
                            {getFieldDecorator('birthday', {
                                rules: [{
                                    required: true, message: '生日不能为空',
                                }],
                            })(
                                <DatePicker />
                            )}
                        </Item>
                    </Col>
                    <Col span={12}>
                        <Item
                            {...formItemLayout}
                            label='岗位'
                            hasFeedback
                        >
                            {getFieldDecorator('title', {
                                rules: [{
                                    required: true, message: '岗位不能为空',
                                }],
                            })(
                                <Input />
                            )}
                        </Item>
                    </Col>
                </Row>
                <Item
                    {...formItemLayout}
                    label='组织机构'
                    hasFeedback
                >
                    {getFieldDecorator('orgid', {
                        rules: [{
                            required: true, message: '组织机构不能为空',
                        }],
                    })(
                        <Select>
                            {
                                this.props.orgaList.map(v => {
                                    return (
                                        <Option key={v.id} value={v.id}>
                                            {v.name}
                                        </Option>
                                    )
                                })
                            }
                        </Select>
                    )}
                </Item>
                <Item
                    {...formItemLayout}
                    label='用户组'
                    hasFeedback
                >
                    {getFieldDecorator('groupids', {
                        rules: [{
                            required: true, message: '用户组不能为空',
                        }],
                    })(
                        <Select
                            mode='multiple'
                        >
                            {
                                this.props.groupList.map(v => {
                                    return (
                                        <Option key={v.id} value={v.id}>
                                            {v.name}
                                        </Option>
                                    )
                                })
                            }
                        </Select>
                    )}
                </Item>
            </Form>
        )
    }
}
export default InfoForm