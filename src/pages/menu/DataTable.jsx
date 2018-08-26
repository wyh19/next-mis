import React, { PureComponent } from 'react'
import { Table, Divider, Popconfirm } from 'antd'
import { connect } from 'react-redux'
import { getList, handleModalForm, deleteInfo } from '../../redux/menu.redux'

@connect(
  state => state.menu,
  { getList, handleModalForm, deleteInfo }
)
class DataTable extends PureComponent {
  componentDidMount() {
    this.props.getList()
  }
  componentDidUpdate(){
    if(this.props.refresh){
      console.log('refresh')
      this.props.getList()
    }
  }
  handleInfo = (type, open, data) => {
    this.props.handleModalForm(type, open, data)
  }
  handleDelete = (id) => {
    this.props.deleteInfo(id)
  }
  render() {
    const columns = [{
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Url',
      dataIndex: 'url',
      key: 'url',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: text => {
        if (text === 0) {
          return (<div>可用</div>)
        } {
          return (<div>停用</div>)
        }
      }
    },
    {
      title: '层级',
      dataIndex: 'level',
      key: 'level',
    },
    {
      title: '创建者',
      dataIndex: 'creatorid',
      key: 'creatorid',
    },
    {
      title: '创建时间',
      dataIndex: 'createtime',
      key: 'createtime',
    },
    {
      title: (<div>操作<Divider type='vertical' />
        <a href='javascript:;' onClick={() => this.handleInfo('add', true)}>新增</a></div>),
      key: 'action',
      render: (text, record) => (
        <span>
          <a href='javascript:;' onClick={() => this.handleInfo('update', true, record)}>编辑</a>
          <Divider type='vertical' />
          <Popconfirm title='确认删除?' onConfirm={() => this.handleDelete(record.id)}>
            <a href='javascript:;'>删除</a>
          </Popconfirm>
        </span>
      )
    }

    ];
    return (
      <Table
        defaultExpandAllRows={true}
        rowKey={record => record.id}
        dataSource={this.props.dataList}
        columns={columns}
        pagination={false} />
    )
  }
}
export default DataTable