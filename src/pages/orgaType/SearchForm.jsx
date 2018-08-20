import React, { PureComponent } from 'react'
import { Form, Row, Col, Input, Button,Radio } from 'antd'
import { connect } from 'react-redux'
import { getList, getInterfaceList,getOrgaList } from '../../redux/orgaType.redux'

const { Item, create } = Form


@create({
    mapPropsToFields(props) {
        if (props.searchForm) {
            let fields = {}
            for (let key in props.searchForm) {
                fields[key] = Form.createFormField({
                    value: props.searchForm[key]
                })
            }
            return fields
        }
    }
})
@connect(
    state => state.orgaType,
    { getList, getInterfaceList,getOrgaList }
)
class SearchForm extends PureComponent {
    componentDidMount() {
        this.props.getInterfaceList()
        this.props.getOrgaList()
        this.props.getList()
    }
    handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.getList(values)
            }
        })
    }
    handleReset = () => {
        this.props.form.resetFields()
        this.props.getList()
    }
    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <Form onSubmit={this.handleSearch}>
                <Row gutter={16}>
                    <Col span={6}>
                        <Item label="名称">
                            {getFieldDecorator('Name')(
                                <Input />
                            )}
                        </Item>
                    </Col>
                    <Col span={6}>
                        <Item label='状态'>
                            {getFieldDecorator('Status')(
                                <Radio.Group>
                                    <Radio value={1}>启用</Radio>
                                    <Radio value={2}>不启用</Radio>
                                </Radio.Group>
                            )}
                        </Item>
                    </Col>
                    <Col span={6} >
                        <Button type="primary" htmlType="submit">查询</Button>
                        <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>重置</Button>
                    </Col>
                </Row>
            </Form>
        )
    }
}

export default SearchForm