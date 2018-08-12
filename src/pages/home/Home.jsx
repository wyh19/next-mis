import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Loadable from 'react-loadable'
import Framework from './Frame'
import Loading from '../../components/loading/Loading'

@connect(
    state => state
)
class Home extends PureComponent {
    /**
     * 根据当前激活的菜单决定显示的页面
     */
    getPage() {
        let { activeMenuCode } = this.props.menu
        if(!activeMenuCode){
            return null
        }
        let menuCode2CompName = activeMenuCode.slice(0, 1).toUpperCase()+activeMenuCode.slice(1)
        return Loadable({
            loader: () => import(`../${activeMenuCode}/${menuCode2CompName}`),
            loading: Loading,
          })
    }
    render() {
        const { redirectTo } = this.props.user
        const Component = this.getPage()
        return (
            <Fragment>
                {redirectTo && redirectTo !== '/home' ? <Redirect to={redirectTo} /> : null}
                <Framework>
                    {
                        Component?<Component/>:null
                    }
                </Framework>
            </Fragment>
        )
    }
}

export default Home