import React, { PureComponent } from 'react'
import { Form, Row, Col, Input, Button, Radio, Select } from 'antd'
import { connect } from 'react-redux'
import { getList, getOrgList, getUserinfoList } from '../../redux/project.redux'

const { Item, create } = Form

@connect(
    state => state.project,
    { getList, getOrgList, getUserinfoList }
)
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
class SearchForm extends PureComponent {
    componentDidMount() {
        this.props.getOrgList()
        this.props.getUserinfoList()
        var values = this.props.searchForm
        //配入分页条件
        values.pagenum = this.props.pagination.current
        values.pagesize = this.props.pagination.pageSize
        this.props.getList(values)
    }
    handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                //配入分页条件
                values.pagenum = 1
                values.pagesize = this.props.pagination.pageSize
                this.props.getList(values)
            }
        })
    }
    handleReset = () => {
        this.props.form.resetFields()
        var values = {}
        //配入分页条件
        values.pagenum = 1
        values.pagesize = this.props.pagination.pageSize
        this.props.getList(values)
    }
    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <Form onSubmit={this.handleSearch}>
                <Row gutter={16}>
                    <Col span={6}>
                        <Item label='名称'>
                            {getFieldDecorator('name')(
                                <Input />
                            )}
                        </Item>
                    </Col>
                    <Col span={6}>
                        <Item label='状态'>
                            {getFieldDecorator('status')(
                                <Radio.Group>
                                    <Radio value={0}>启用</Radio>
                                    <Radio value={1}>停用</Radio>
                                </Radio.Group>
                            )}
                        </Item>
                    </Col>
                    <Col span={8}>
                        <Item label='项目经理'>
                            {getFieldDecorator('pmid')(
                                <Select
                                    style={{ width: 170 }}
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
                    </Col>
                    <Col span={4} >
                        <Button type='primary' htmlType='submit'>查询</Button>
                        <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>重置</Button>
                    </Col>
                </Row>
            </Form>
        )
    }
}

export default SearchForm