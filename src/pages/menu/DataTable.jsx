import React, { PureComponent } from 'react'
import { Table, Divider, Popconfirm } from 'antd'
import { connect } from 'react-redux'
import { getList, handleModalForm, deleteInfo } from '../../redux/menu.redux'

@connect(
  state => state.menu,
  { getList, handleModalForm, deleteInfo }
)
class DataTable extends PureComponent {
  handleInfo = (type, open, data) => {
    this.props.handleModalForm(type, open, data)
  }
  handleDelete = (id) => {
    this.props.deleteInfo(id)
  }
  render() {
    const columns = [{
      title: '名称',
      dataIndex: 'Name',
      key: 'Name',
    }, 
    {
      title: 'Url',
      dataIndex: 'Url',
      key: 'Url',
    }, 
    {
      title: '状态',
      dataIndex: 'Status',
      key: 'Status',
      render: text => {
        if (text == 1) {
          return (<div>启用</div>)
        } else
          if (text == 2) {
            return (<div>不启用</div>)
          } else {
            return null
          }
      }
    }, 
    {
      title: '创建者',
      dataIndex: 'Creator',
      key: 'Creator',
    }, 
    {
      title: '创建时间',
      dataIndex: 'CreateTime',
      key: 'CreateTime',
    }, {
      title: (<div>操作<Divider type="vertical" />
        <a href="javascript:;" onClick={() => this.handleInfo('add', true)}>新增</a></div>),
      key: 'action',
      render: (text, record) => (
        <span>
          <a href="javascript:;" onClick={() => this.handleInfo('edit', true, record)}>编辑</a>
          <Divider type="vertical" />
          <Popconfirm title="确认删除?" onConfirm={() => this.handleDelete(record.ID)}>
            <a href="javascript:;">删除</a>
          </Popconfirm>
        </span>
      )
    }

    ];
    return (
      <Table
        rowKey={record => record.ID}
        dataSource={this.props.dataList}
        columns={columns}
        pagination={false} />
    )
  }
}
export default DataTable