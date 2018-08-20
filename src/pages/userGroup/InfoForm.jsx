import React, { PureComponent } from 'react'
import { Form, Input, Select } from 'antd'
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { connect } from 'react-redux'
import _ from 'lodash'

const { Item, create } = Form
const { Option } = Select

@create({
    mapPropsToFields(props) {
        if (props.formType === 'edit') {
            let fields = {}
            for (let key in props.formData) {
                fields[key] = Form.createFormField({
                    value: props.formData[key]
                })
            }
            return fields
        }
    }
})
@connect(
    state => state.userGroup
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
                    label="名称"
                    hasFeedback
                >
                    {getFieldDecorator('Name', {
                        rules: [{
                            required: true, message: '名称不能为空',
                        }],
                    })(
                        <Input />
                    )}
                </Item>
                <Item
                    {...formItemLayout}
                    label="描述"
                    hasFeedback
                >
                    {getFieldDecorator('Description', {
                        rules: [{
                            required: true, message: '描述不能为空',
                        }],
                    })(
                        <Input />
                    )}
                </Item>
               <Item
                    {...formItemLayout}
                    label="关联角色"
                    hasFeedback
                >
                    {getFieldDecorator('Roles')(
                        <Select
                            mode="multiple"
                        >
                            {
                                this.props.roleList.map(v => {
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
                <Item
                    {...formItemLayout}
                    label="关联用户"
                    hasFeedback
                >
                    {getFieldDecorator('Users')(
                        <Select
                            mode="multiple"
                        >
                            {
                                this.props.userList.map(v => {
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