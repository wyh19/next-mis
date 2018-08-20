import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Loadable from 'react-loadable'
import Framework from './Frame'
import Loading from '../../components/loading/Loading'

@connect(
    state => state
)
class Home extends Component {
    /**
     * 根据当前激活的菜单决定显示的页面
     */
    getPage() {
        let { activeMenuCode } = this.props.framework
        if (!activeMenuCode) {
            return null
        }
        let Comp = Loadable({
            loader: () => import(`../${activeMenuCode}/Page`),
            loading: Loading,
        })
        return <Comp />
    }
    shouldComponentUpdate(nextProps, nextState) {
        //解决组件页面不停的装载卸载的问题
        return nextProps.framework.activeMenuCode !== this.props.framework.activeMenuCode
    }
    render() {
        const { redirectTo } = this.props.auth
        return (
            <Fragment>
                {redirectTo && redirectTo !== '/home' ? <Redirect to={redirectTo} /> : null}
                <Framework>
                    {
                        this.getPage()
                    }
                </Framework>
            </Fragment>
        )
    }
}

export default Home