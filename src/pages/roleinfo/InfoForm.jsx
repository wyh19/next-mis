import React, { PureComponent } from 'react'
import { Form, Input, Select, Radio } from 'antd'
import { connect } from 'react-redux'

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
@connect(
    state => state.roleinfo
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
                    label='权限'
                    hasFeedback
                >
                    {getFieldDecorator('operationids', {
                        rules: [{
                            required: true, message: '权限不能为空',
                        }],
                    })(
                        <Select
                            mode='multiple'
                        >
                            {
                                this.props.operationList.map(v => {
                                    return (
                                        <Select.Option key={v.id} value={v.id}>
                                            {v.name}
                                        </Select.Option>
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