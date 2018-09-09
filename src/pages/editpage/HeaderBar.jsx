import React, { Component } from 'react'
import { Checkbox, Divider, Icon, Input } from 'antd'

import './HeaderBar.scss'

class HeaderBar extends Component {
    render() {
        return (
            <div className='ep-headerbar'>
                <div>全部({1300})</div>
                <div>已分拣({300})</div>
                <div>未分拣({1000})</div>
                <Divider type='vertical' />
                <div>
                    <Checkbox>
                        合并相似
                    </Checkbox>
                </div>
                <Divider type='vertical' />
                <div>
                    操作<Icon type="question-circle" />:
                    <span>译</span>
                    <span>日</span>
                    <span>简</span>
                    <span><Icon type="setting" /></span>
                    <span><Icon type="delete" /></span>
                </div>
                <Divider type='vertical' />
                <div>
                    <Input.Search
                        placeholder="input search text"
                        onSearch={value => console.log(value)}
                    />
                </div>
                <div>
                    <Icon type='edit' />
                    进入编辑
                </div>
            </div>
        )
    }
}
export default HeaderBar