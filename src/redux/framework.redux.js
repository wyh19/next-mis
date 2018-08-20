USE_MOCK && require('../mock/menu')

import axios from 'axios'
import _ from 'lodash'

const MENU_LIST = 'MENU_LIST'
const OPEN_MENU = 'OPEN_MENU'
const CLOSE_MENU = 'CLOSE_MENU'

const initState = {
    menus: [],
    openedMenus: [],
    activeMenuCode: null
}

/**
 * 从嵌套的菜单列表中找出符合code的菜单对象，返回一个全新的值
 * @param {Array} menus 
 * @param {String} code 
 */
function getMenuByCode(menus, code) {
    var result = {};
    for (var key in menus) {
        var menu = menus[key]
        if (menu.children) {
            result = getMenuByCode(menu.children, code)
            if (result.code === code) {
                break
            }
        } else {
            if (menu.code === code) {
                result = { ...menu }
                break
            }
        }
    }
    return result
}

export function framework(state = initState, action) {
    switch (action.type) {
        case MENU_LIST:
            {
                return {
                    ...state,
                    menus: action.payload
                }
            }
        case OPEN_MENU:
            {
                let menuCode = action.payload
                if (_.findIndex(state.openedMenus, v => v.code == menuCode) === -1) {
                    let menu = getMenuByCode(state.menus, menuCode)
                    return {
                        ...state,
                        openedMenus: state.openedMenus.concat(menu),
                        activeMenuCode: menuCode
                    }
                } else {
                    return {
                        ...state,
                        activeMenuCode: menuCode
                    }
                }
            }
        case CLOSE_MENU:
            {
                let menuCode = action.payload
                let openedMenus = _.filter(state.openedMenus, v => v.code !== menuCode)
                let activeMenuCode = state.activeMenuCode === menuCode ? (openedMenus.length > 0 ? openedMenus[0].code : null) : state.activeMenuCode
                return {
                    ...state,
                    openedMenus: openedMenus,
                    activeMenuCode: activeMenuCode
                }
            }
        default:
            return state
    }
}

function menuList(data) {
    return {
        type: MENU_LIST,
        payload: data
    }
}


export function getMenuList() {
    const menus = [{
        icon: 'laptop',
        text: '工作台',
        code: 'bench'
    },
    {
        icon: 'bars',
        text: '菜单',
        code: 'menu'
    },
    {
        icon: 'bars',
        text: '组织机构',
        code: 'organization'
    },
    {
        icon: 'bars',
        text: '组织机构类别',
        code: 'orgaType'
    },
    {
        icon: 'bars',
        text: '用户',
        code: 'user'
    },
    {
        icon: 'bars',
        text: '用户组',
        code: 'userGroup'
    },
    {
        icon: 'bars',
        text: '项目',
        code: 'project'
    },
    {
        icon: 'bars',
        text: '角色',
        code: 'role'
    },
    {
        icon: 'bars',
        text: '权限',
        code: 'rights'
    },
    // {
    //     icon: 'user',
    //     text: '用户管理',
    //     children: [{
    //         text: '角色',
    //         code: 'role'
    //     },{
    //         text: '权限',
    //         code: 'rights'
    //     }]
    // },
    ]
    return dispatch => {
        dispatch(menuList(menus))
    }
}

export function openMenu(menuCode) {
    return {
        type: OPEN_MENU,
        payload: menuCode
    }
}

export function closeMenu(menuCode) {
    return {
        type: CLOSE_MENU,
        payload: menuCode
    }
}