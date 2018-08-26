import React, { PureComponent } from 'react'
import { Spin } from 'antd'

class Loading extends PureComponent {
    render() {
        return (
            <Spin size='large' />
        )
    }
}

export default Loading
