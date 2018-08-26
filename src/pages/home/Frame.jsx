/**
 * Created by 30113 on 2018/3/22.
 */
import React from 'react'
import { Layout, Icon } from 'antd';
import MenuBar from './MenuBar'
import HeadFixedMenuBar from './HeadFixedMenuBar'
import HeadOpenedMenuBar from './HeadOpenedMenuBar'
import HeadToolbar from './HeadToolbar'
import './Frame.scss'

const { Header, Sider, Content } = Layout;

/**
 * 页面框架组件
 */
class Frame extends React.PureComponent {
    state = {
        collapsed: false,
    };

    toggle = () => {
        let collapsed = !this.state.collapsed
        this.setState({
            collapsed,
        });
    }

    render() {
        return (
            <Layout>
                <Header>
                    <div className='logo' >
                        {/* 苗建信息数据处理中心 */}
                    </div>
                    <HeadFixedMenuBar />
                    <HeadOpenedMenuBar />
                    <HeadToolbar />
                </Header>
                <Layout>
                    <Sider
                        trigger={null}
                        collapsible
                        collapsedWidth={0}
                        width={220}
                        collapsed={this.state.collapsed}
                    >
                        <Icon
                            className={this.state.collapsed ? 'trigger-right' : 'trigger-left'}
                            type={this.state.collapsed ? 'caret-right' : 'caret-left'}
                            onClick={this.toggle}
                        />
                        <MenuBar />
                    </Sider>
                    <Content style={{ padding: '16px', background: '#fff', minHeight: 280 }}>
                        {this.props.children}
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default Frame