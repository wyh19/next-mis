import React, { PureComponent } from 'react'
import { Form, Input, Select, Radio } from 'antd'
import { connect } from 'react-redux'

const { Item, create } = Form

@create({
    mapPropsToFields(props) {
        if (props.formType === 'update') {
            let fields = {}
            console.log(props.formData)
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
    state => state.project
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
                <Item
                    {...formItemLayout}
                    label='项目经理'
                    hasFeedback
                >
                    {getFieldDecorator('pmid', {
                        rules: [{
                            required: true, message: '项目经理不能为空',
                        }],
                    })(
                        <Select
                            showSearch
                            filterOption={(input, option) => option.props.
                                children.toLowerCase().
                                indexOf(input.toLowerCase()) >= 0}
                        >
                            {
                                this.props.userinfoList.map(v => {
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
                <div style={{textAlign:'center',color:'red',marginTop:'10px'}}>注意：关联机构和客户经理请保持数目和顺序一一对应</div>
                <Item
                    {...formItemLayout}
                    label='关联机构'
                    hasFeedback
                >
                    {getFieldDecorator('orgids', {
                        rules: [{
                            required: true, message: '关联机构不能为空',
                        }],
                    })(
                        <Select
                            mode='multiple'
                        >
                            {
                                this.props.orgList.map(v => {
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
                <Item
                    {...formItemLayout}
                    label='客户经理'
                    hasFeedback
                >
                    {getFieldDecorator('cmids', {
                        rules: [{
                            required: true, message: '客户经理不能为空',
                        }],
                    })(
                        <Select
                            mode='multiple'
                            showSearch
                            filterOption={(input, option) => option.props.
                                children.toLowerCase().
                                indexOf(input.toLowerCase()) >= 0}
                        >
                            {
                                this.props.userinfoList.map(v => {
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