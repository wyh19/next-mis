import React from 'react'
import { Icon } from 'antd'
import { connect } from 'react-redux'
import { activeMenu } from '../../redux/framework.redux'

@connect(
    state => state.framework,
    { activeMenu }
)
class HeadFixedMenuBar extends React.Component {
    handleClick = (menuCode) => {
        this.props.activeMenu(menuCode)
    }
    render() {
        return (
            <div className='fixed-menu-bar'>
                <Icon className={this.props.activeMenuCode === 'bench'?'fixed-menu active' :'fixed-menu'}
                    type='laptop'
                    onClick={() => { this.handleClick('bench') }} />
            </div>
        )
    }
}
export default HeadFixedMenuBar