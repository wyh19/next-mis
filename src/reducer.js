import { combineReducers } from 'redux'
import { auth } from './redux/auth.redux'
import { framework } from './redux/framework.redux'
import { user } from './redux/user.redux'
import { userGroup } from './redux/userGroup.redux'
import { menu } from './redux/menu.redux'
import { bench } from './redux/bench.redux'
import { role } from './redux/role.redux'
import { rights } from './redux/rights.redux'
import { organization } from './redux/organization.redux'
import { orgaType } from './redux/orgaType.redux'
import { imterface } from './redux/interface.redux'//因为interface是保留字，故意写成im
import { project } from './redux/project.redux'
import { projManager } from './redux/projManager.redux'


export default combineReducers({
    auth,
    framework,
    user,
    userGroup,
    menu,
    bench,
    role,
    rights,
    organization,
    orgaType,
    imterface,
    project,
    projManager,
})