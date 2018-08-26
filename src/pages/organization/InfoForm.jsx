import React, { PureComponent } from 'react'
import { Form, Input, Radio } from 'antd'

const RadioGroup = Radio.Group
const { Item, create } = Form
@create({
    mapPropsToFields(props) {
        if (props.formType === 'update') {
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
                <Item
                    {...formItemLayout}
                    label='名称'
                    hasFeedback
                >
                    {getFieldDecorator('name', {
                        rules: [{
                            required: true, message: '名称不能为空',
                        }],
                    })(
                        <Input />
                    )}
                </Item>
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
                        <RadioGroup>
                            <Radio value={0}>启用</Radio>
                            <Radio value={1}>停用</Radio>
                        </RadioGroup>
                    )}
                </Item>
                <Item
                    {...formItemLayout}
                    label='管理企业'
                    hasFeedback
                >
                    {getFieldDecorator('ismanagerplatform', {
                        rules: [{
                            required: true, message: '管理企业不能为空',
                        }],
                    })(
                        <RadioGroup>
                            <Radio value={1}>是</Radio>
                            <Radio value={0}>否</Radio>
                        </RadioGroup>
                    )}
                </Item>
            </Form>
        )
    }
}
export default InfoForm