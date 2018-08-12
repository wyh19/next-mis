/**
 * Created by 30113 on 2018/3/22.
 */
import React from 'react'
import { Menu, Icon } from 'antd';
import { connect } from 'react-redux'
import { getMenuList, openMenu } from '../../redux/menu.redux'

const SubMenu = Menu.SubMenu
const MenuItem = Menu.Item

@connect(
    state => state.menu,
    { getMenuList, openMenu }
)
class MenuBar extends React.Component {
    componentDidMount() {
        this.props.getMenuList()
    }
    handleClick = (e) => {
        this.props.openMenu(e.key)
    }
    mapMenus(menus) {
        return menus.map(v => {
            if (v.children) {
                return (
                    <SubMenu key={v.code ? v.code : v.text} title={<span><Icon type={v.icon} /><span>{v.text}</span></span>}>
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
                        <Icon type={v.icon} />
                        <span className="nav-text">{v.text}</span>
                    </MenuItem>
                )
            }
        })
    }
    render() {
        return (
            <Menu theme="dark"
                mode={this.props.mode}
                onClick={this.handleClick}
            >
                {
                    this.mapMenus(this.props.menus)
                }
            </Menu>
        )
    }
}

export default MenuBar