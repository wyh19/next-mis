import React, { Component } from 'react'
import LeftMenu from './LeftMenu'
import RightAttr from './RightAttr'
import Center from './Center'

import './Page.scss'

class Page extends Component {
    render() {
        return (
            <div className='edit-page'>
                <LeftMenu />
                <RightAttr />
                <Center />
            </div>
        )
    }
}
export default Page