import React, { PureComponent } from 'react'
import { Form, Row, Col, Input, Button, Radio } from 'antd'
import { connect } from 'react-redux'
import { getList, getMenuList } from '../../redux/rights.redux'

const { Item, create } = Form
const RadioGroup = Radio.Group


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
    state => state.rights,
    { getList, getMenuList }
)
class SearchForm extends PureComponent {
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
    componentDidMount() {
        this.props.getMenuList()
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
                    <Col span={8}>
                        <Item label="类型">
                            {getFieldDecorator('RightType')(
                                <RadioGroup>
                                    <Radio value={1}>菜单权限</Radio>
                                    <Radio value={2}>功能权限</Radio>
                                </RadioGroup>
                            )}
                        </Item>
                    </Col>
                    <Col span={10}>
                        <Button type="primary" htmlType="submit">查询</Button>
                        <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>重置</Button>
                    </Col>
                </Row>
            </Form>
        )
    }
}

export default SearchForm