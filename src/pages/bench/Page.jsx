import React from 'react'
import { Row, Col, Card } from 'antd'
import './Page.scss'

class Page extends React.Component {
    render() {
        return (
            <Row gutter={16}>
                <Col span={12}>
                    <Card title="技术特点" >
                        <div style={{margin:'5px 0'}}>
                            1、React+Redux+webpack+antd搭建
                        </div>
                        <div style={{margin:'5px 0'}}>
                            2、配置了热更新、代码分离、按需加载，提高开发、运行效率
                        </div>
                        <div style={{margin:'5px 0'}}>
                            3、不用iframe实现仿传统MIS系统的多标签切换
                        </div>
                        <div style={{margin:'5px 0'}}>
                            4、antd实现统一的增删改查流程，redux管理表格分页、表单数据
                        </div>
                        <div style={{margin:'5px 0'}}>
                            5、利用Mockjs进行前端独立开发，无需等待后端接口实现
                        </div>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="踩坑列表" >
                        <div style={{margin:'5px 0'}}>
                            1、antd表单自动验证时报错‘push is not undefined’ 信息，经排查是losash按需加载未正确配置导致
                        </div>
                        <div style={{margin:'5px 0'}}>
                            2、每次redux更新，标签页面的生命周期函数componentDidMount触发，而不是componentDidUpdate触发，经排查是模块按需加载时未进行当前模块是否切换的检查，导致每次都重新卸载、加载该模块
                        </div>
                    </Card>
                </Col>
            </Row>
        )
    }
}
export default Page