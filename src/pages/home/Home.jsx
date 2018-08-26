import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Loadable from 'react-loadable'
import Framework from './Frame'
import Loading from '../../components/loading/Loading'
import { LocaleProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN';

@connect(
    state => state
)
class Home extends Component {
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
        const condition1 = nextProps.framework.activeMenuCode !== this.props.framework.activeMenuCode
        const condition2 = nextProps.auth.redirectTo !== this.props.auth.redirectTo
        return condition1 || condition2
    }
    render() {
        const { redirectTo } = this.props.auth
        return (
            <Fragment>
                {redirectTo && redirectTo !== '/home' ? <Redirect to={redirectTo} /> : null}
                <LocaleProvider locale={zhCN}>
                    <Framework>
                        {
                            this.getPage()
                        }
                    </Framework>
                </LocaleProvider>
            </Fragment>
        )
    }
}

export default Home