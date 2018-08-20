import React, { PureComponent } from 'react'
import { Form, Input, Radio, Select } from 'antd'
import {connect} from 'react-redux'

const { Item, create } = Form
const RadioGroup = Radio.Group
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
    state=>state.rights
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
                    label="菜单"
                    hasFeedback
                >
                    {getFieldDecorator('Rights')(
                        <Select
                            mode="multiple"
                        >
                            {
                                this.props.menuList.map(v => {
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
                    label="权限类型"
                    hasFeedback
                >
                    {getFieldDecorator('RightType', {
                        rules: [{
                            required: true, message: '权限类型不能为空',
                        }],
                    })(
                        <RadioGroup>
                            <Radio value={1}>菜单权限</Radio>
                            <Radio value={2}>功能权限</Radio>
                        </RadioGroup>
                    )}
                </Item>
            </Form>
        )
    }
}
export default InfoForm