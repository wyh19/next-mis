import React from 'react'
import { Icon, Modal, Popover, message } from 'antd'
import { connect } from 'react-redux'
import { openMenu, closeMenu } from '../../redux/framework.redux'

const stepWidth = 100//步调的像素值
@connect(
    state => state.framework,
    { openMenu, closeMenu }
)
class HeadOpenedMenuBar extends React.PureComponent {
    constructor(props) {
        super(props)
        this.handleLeft = this.handleLeft.bind(this)
        this.handleRight = this.handleRight.bind(this)
        this.state = {
            left: 0,
            menuBarWrap_width: 0,
            menus_width: 0,
        }
    }
    componentDidUpdate() {
        //在这里计算菜单总宽度、菜单外容器宽度、菜单内容器left值
        let menuBarWrap = document.getElementsByClassName('menu-bar-wrap')[0]
        let menuBarWrap_width = menuBarWrap.offsetWidth
        let menus = menuBarWrap.firstChild.childNodes
        let menus_width = Array.prototype.reduce.call(menus, (total, item) => {
            return total + item.offsetWidth
        }, 0)
        this.setState({
            menuBarWrap_width, menus_width
        })
    }
    /**
     * 根据打开的菜单数组生成菜单列表
     * 可以同时用于横向菜单和列表显示
     * @param {Array} openedMenus 
     */
    getOpenedMenuList(openedMenus) {
        return openedMenus.map(v => (
            <div
                key={v.code}
                className={v.code === this.props.activeMenuCode ? 'menu active' : 'menu'}
            >
                <div
                    onClick={() => { this.clickMenu(v.code) }}
                >
                    {v.name}
                </div>
                <Icon className="close" type="close" onClick={() => { this.closeMenu(v) }} />
            </div>
        ))
    }
    clickMenu(menuCode) {
        this.props.openMenu(menuCode)
    }
    /**
     * 关闭某个菜单
     * @param {Object} menu 
     */
    closeMenu(menu) {
        this.props.closeMenu(menu.code)
        // Modal.confirm({
        //     title: '确认',
        //     content: `将要关闭【${menu.text}】窗口，是否继续？`,
        //     okText: '确认',
        //     cancelText: '取消',
        //     onOk: () => {
        //         this.props.closeMenu(menu.code)
        //     }
        // })
    }
    handleLeft() {
        let { left } = this.state
        if (left === 0) {
            message.info('左侧已无更多菜单')
            return
        }
        if (left < -stepWidth * 1.5) {
            left += stepWidth
        } else {
            left = 0
        }
        this.setState({ left })
    }
    handleRight() {
        let { left, menuBarWrap_width, menus_width } = this.state
        let right = menus_width + left - menuBarWrap_width
        if (right <= 0) {
            message.info('右侧已无更多菜单')
            return
        }
        if (right > stepWidth * 1.5) {
            left -= stepWidth
        } else {
            left -= right
        }
        this.setState({ left })
    }
    render() {
        const { left } = this.state
        return (
            <div className="opened-menu-bar">
                <div className="menu-bar-wrap">
                    <div className="menu-bar-container" style={{ left: left + 'px' }}>
                        {
                            this.getOpenedMenuList(this.props.openedMenus)
                        }
                    </div>
                </div>
                <div className="menu-bar-ctrl">
                    <Icon type="caret-left"
                        className="ctrl-enable"
                        onClick={this.handleLeft} />
                    <Popover
                        trigger="click"
                        title="打开的菜单"
                        content={this.getOpenedMenuList(this.props.openedMenus)}
                    >
                        <Icon type="bars" className="ctrl-enable" />
                    </Popover>
                    <Icon type="caret-right"
                        className="ctrl-enable"
                        onClick={this.handleRight} />
                </div>
            </div>
        )
    }
}

export default HeadOpenedMenuBar