import React, { PureComponent } from 'react'
import { Form, Input, Radio } from 'antd'

const RadioGroup = Radio.Group
const { Item, create } = Form
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
                    label="状态"
                    hasFeedback
                >
                    {getFieldDecorator('Status', {
                        rules: [{
                            required: true, message: '状态不能为空',
                        }],
                    })(
                        <RadioGroup>
                            <Radio value={1}>启用</Radio>
                            <Radio value={2}>不启用</Radio>
                        </RadioGroup>
                    )}
                </Item>
                <Item
                    {...formItemLayout}
                    label="管理平台"
                    hasFeedback
                >
                    {getFieldDecorator('IsManagerPlatform', {
                        rules: [{
                            required: true, message: '管理平台不能为空',
                        }],
                    })(
                        <RadioGroup>
                            <Radio value={true}>是</Radio>
                            <Radio value={false}>否</Radio>
                        </RadioGroup>
                    )}
                </Item>
                <Item
                    {...formItemLayout}
                    label="关键字"
                    hasFeedback
                >
                    {getFieldDecorator('KeyWord', {
                        rules: [{
                            required: true, message: '关键字不能为空',
                        }],
                    })(
                        <Input />
                    )}
                </Item>
            </Form>
        )
    }
}
export default InfoForm