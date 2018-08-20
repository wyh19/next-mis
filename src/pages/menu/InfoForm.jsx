import React, { PureComponent } from 'react'
import { Form, Input, Radio } from 'antd'
import {connect} from 'react-redux'

const { Item, create } = Form
const RadioGroup = Radio.Group
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
    state=>state.menu
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
                    label="Url"
                    hasFeedback
                >
                    {getFieldDecorator('Url', {
                        rules: [{
                            required: true, message: 'Url不能为空',
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
            </Form>
        )
    }
}
export default InfoForm