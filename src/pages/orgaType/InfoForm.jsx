import React, { PureComponent } from 'react'
import { Form, Input, Select,Radio } from 'antd'
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
    state => state.orgaType
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
                    label="状态"
                    hasFeedback
                >
                    {getFieldDecorator('Status', {
                        rules: [{
                            required: true, message: '状态不能为空',
                        }],
                    })(
                        <Radio.Group>
                            <Radio value={1}>启用</Radio>
                            <Radio value={2}>不启用</Radio>
                        </Radio.Group>
                    )}
                </Item>
                <Item
                    {...formItemLayout}
                    label="组织机构"
                    hasFeedback
                >
                    {getFieldDecorator('Organizational')(
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
                <Item
                    {...formItemLayout}
                    label="接口"
                    hasFeedback
                >
                    {getFieldDecorator('Interface')(
                        <Select
                            mode="multiple"
                        >
                            {
                                this.props.interfaceList.map(v => {
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