import React, { PureComponent } from 'react'
import { Form, Row, Col, Input, Button, Radio } from 'antd'
import { connect } from 'react-redux'
import { getList } from '../../redux/api.redux'

const { Item, create } = Form

@connect(
    state => state.api,
    { getList }
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
    componentDidMount() {
        //todo:这里可以做一个优化，区分第一次打开和标签切换
        var values = this.props.searchForm
        //配入分页条件
        values.pagenum = this.props.pagination.current
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
                        <Item label='类别'>
                            {getFieldDecorator('type')(
                                <Radio.Group>
                                    <Radio value={1}>标准</Radio>
                                    <Radio value={2}>非标准</Radio>
                                </Radio.Group>
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
                    <Col span={6}>
                        <Button type='primary' htmlType='submit'>查询</Button>
                        <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>重置</Button>

                    </Col>
                </Row>
            </Form>
        )
    }
}

export default SearchForm