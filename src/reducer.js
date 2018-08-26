import { combineReducers } from 'redux'
import { auth } from './redux/auth.redux'
import { framework } from './redux/framework.redux'
import { userinfo } from './redux/userinfo.redux'
import { usergroup } from './redux/usergroup.redux'
import { menu } from './redux/menu.redux'
import { bench } from './redux/bench.redux'
import { roleinfo } from './redux/roleinfo.redux'
import { operation } from './redux/operation.redux'
import { organization } from './redux/organization.redux'
import { classification } from './redux/classification.redux'
import { api } from './redux/api.redux'
import { project } from './redux/project.redux'


export default combineReducers({
    auth,
    framework,
    bench,
    userinfo,
    usergroup,
    menu,
    roleinfo,
    operation,
    organization,
    classification,
    api,
    project,
})