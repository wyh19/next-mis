/**
 * Created by 30113 on 2018/3/22.
 */
import React from 'react'
import { Menu } from 'antd';
import { connect } from 'react-redux'
import { getMenuList, openMenu } from '../../redux/framework.redux'

const SubMenu = Menu.SubMenu
const MenuItem = Menu.Item

@connect(
    state => state,
    { getMenuList, openMenu }
)
class MenuBar extends React.Component {
    componentDidMount() {
        this.props.getMenuList(this.props.auth.userid)
    }
    handleClick = (e) => {
        this.props.openMenu(e.key)
    }
    mapMenus(menus) {
        return menus.map(v => {
            if (v.children) {
                return (
                    <SubMenu key={v.code ? v.code : v.id} title={v.name}>
                        {
                            this.mapMenus(v.children)
                        }
                    </SubMenu>
                )
            } else {
                return (
                    <MenuItem
                        key={v.code}
                    >
                        <span className='nav-text'>{v.name}</span>
                    </MenuItem>
                )
            }
        })
    }
    render() {
        return (
            <Menu theme='dark'
                mode={'inline'}
                selectedKeys={[this.props.framework.activeMenuCode]}
                onClick={this.handleClick}
            >
                {
                    this.mapMenus(this.props.framework.menus)
                }
            </Menu>
        )
    }
}

export default MenuBar