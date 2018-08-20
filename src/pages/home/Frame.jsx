/**
 * Created by 30113 on 2018/3/22.
 */
import React from 'react'
import { Layout, Icon } from 'antd';
import MenuBar from './MenuBar'
import OpenedMenuBar from './OpenedMenuBar'
import HeadToolbar from './HeadToolbar'
import './Frame.scss'

const { Header, Sider, Content } = Layout;

/**
 * 页面框架组件
 */
class Frame extends React.PureComponent {
    state = {
        collapsed: false,
        mode: 'inline',
    };

    toggle = () => {
        let collapsed = !this.state.collapsed
        this.setState({
            collapsed,
            mode: collapsed ? 'vertical' : 'inline',
        });
    }

    render() {
        return (
            <Layout>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                >
                    <div className="logo" />
                    <MenuBar mode={this.state.mode} />
                </Sider>
                <Layout>
                    <Header>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                        <OpenedMenuBar />
                        <HeadToolbar />
                    </Header>
                    <Content style={{ padding:'10px',background: '#fff', minHeight: 280 }}>
                        {this.props.children}
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default Frame