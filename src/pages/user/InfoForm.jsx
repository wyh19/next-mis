import React, { PureComponent } from 'react'
import { Row, Col, Form, Input, Select, InputNumber, Radio, DatePicker } from 'antd'
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { connect } from 'react-redux'
import _ from 'lodash'

const { Item, create } = Form
const { Option } = Select
const RadioGroup = Radio.Group
@create({
    mapPropsToFields(props) {
        if (props.formType === 'edit') {
            let fields = {}
            for (let key in props.formData) {
                fields[key] = Form.createFormField({
                    value: props.formData[key]
                })
                if(key === 'Birthday'){
                    fields[key] = Form.createFormField({
                        value: moment(props.formData[key],'YYYY-MM-DD')
                    })
                }
            }
            return fields
        }
    }
})
@connect(
    state => state.user
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
                    formType === 'edit' ? <Item>
                        {getFieldDecorator('ID')(
                            <Input type="hidden" />
                        )}
                    </Item> : null
                }
                <Item
                    {...formItemLayout}
                    label="用户名"
                    hasFeedback
                >
                    {getFieldDecorator('Name', {
                        rules: [{
                            required: true, message: '用户名不能为空',
                        }],
                    })(
                        <Input />
                    )}
                </Item>
                <Item
                    {...formItemLayout}
                    label="姓名"
                    hasFeedback
                >
                    {getFieldDecorator('NameCN', {
                        rules: [{
                            required: true, message: '姓名不能为空',
                        }],
                    })(
                        <Input />
                    )}
                </Item>
                <Item
                    {...formItemLayout}
                    label="密码"
                    hasFeedback
                >
                    {getFieldDecorator('Password', {
                        rules: [{
                            required: true, message: '密码不能为空',
                        }, {
                            min: 8, message: '密码不能低于8位',
                        }, {
                            max: 16, message: '密码不能高于16位',
                        }],
                    })(
                        <Input />
                    )}
                </Item>
                <Row>
                    <Col span={12}>
                        <Item
                            {...formItemLayout}
                            label="性别"
                            hasFeedback
                        >
                            {getFieldDecorator('Sex', {
                                rules: [{
                                    required: true, message: '性别不能为空',
                                }],
                            })(
                                <RadioGroup>
                                    <Radio value={1}>男</Radio>
                                    <Radio value={0}>女</Radio>
                                </RadioGroup>
                            )}
                        </Item>
                    </Col>
                    <Col span={12}>
                        <Item
                            {...formItemLayout}
                            label="年龄"
                            hasFeedback
                        >
                            {getFieldDecorator('Age', {
                                rules: [{
                                    required: true, message: '年龄不能为空',
                                }],
                            })(
                                <InputNumber min={0} max={100} />
                            )}
                        </Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Item
                            {...formItemLayout}
                            label="生日"
                            hasFeedback
                        >
                            {getFieldDecorator('Birthday', {
                                rules: [{
                                    required: true, message: '生日不能为空',
                                }],
                            })(
                                <DatePicker locale={locale} />
                            )}
                        </Item>
                    </Col>
                    <Col span={12}>
                        <Item
                            {...formItemLayout}
                            label="岗位"
                            hasFeedback
                        >
                            {getFieldDecorator('Post')(
                                <Input />
                            )}
                        </Item>
                    </Col>
                </Row>
                <Item
                    {...formItemLayout}
                    label="组织机构"
                    hasFeedback
                >
                    {getFieldDecorator('OrganizationalID')(
                        <Select
                            mode="multiple"
                        >
                            {
                                this.props.orgaList.map(v => {
                                    return (
                                        <Option key={v.ID} value={v.ID}>
                                            {v.Name}
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