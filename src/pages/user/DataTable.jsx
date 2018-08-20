import React, { PureComponent } from 'react'
import { Table, Divider, Popconfirm, Tag } from 'antd'
import { connect } from 'react-redux'
import { handleModalForm, deleteInfo } from '../../redux/user.redux'

@connect(
  state => state.user,
  { handleModalForm, deleteInfo }
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
      title: '用户名',
      dataIndex: 'Name',
      key: 'Name',
    },
    {
      title: '姓名',
      dataIndex: 'NameCN',
      key: 'NameCN',
    },
    {
      title: '性别',
      dataIndex: 'Sex',
      key: 'Sex',
      render: text => {
        if (text == 1) {
          return (<div>男</div>)
        } else
          if (text == 0) {
            return (<div>女</div>)
          } else {
            return null
          }
      }
    },
    {
      title: '年龄',
      dataIndex: 'Age',
      key: 'Age',
    },
    {
      title: '生日',
      dataIndex: 'Birthday',
      key: 'Birthday',
    },
    {
      title: '岗位',
      dataIndex: 'Post',
      key: 'Post',
    },
    {
      title: '创建者',
      dataIndex: 'Creator',
      key: 'Creator',
    }, {
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