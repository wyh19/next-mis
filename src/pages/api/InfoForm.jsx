import React, { PureComponent } from 'react'
import { Form, Input, Radio } from 'antd'

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
                    label='加密key'
                    hasFeedback
                >
                    {getFieldDecorator('appkey', {
                        rules: [{
                            required: true, message: '加密key不能为空',
                        }],
                    })(
                        <Input />
                    )}
                </Item>
                <Item
                    {...formItemLayout}
                    label='url'
                    hasFeedback
                >
                    {getFieldDecorator('requesturl', {
                        rules: [{
                            required: true, message: 'url不能为空',
                        }],
                    })(
                        <Input />
                    )}
                </Item>
                <Item
                    {...formItemLayout}
                    label='类别'
                    hasFeedback
                >
                    {getFieldDecorator('type', {
                        rules: [{
                            required: true, message: '类别不能为空',
                        }],
                    })(
                        <Radio.Group>
                            <Radio value={1}>标准</Radio>
                            <Radio value={2}>非标准</Radio>
                        </Radio.Group>
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
                        <Radio.Group>
                            <Radio value={0}>启用</Radio>
                            <Radio value={1}>停用</Radio>
                        </Radio.Group>
                    )}
                </Item>
            </Form>
        )
    }
}
export default InfoForm