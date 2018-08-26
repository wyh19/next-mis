USE_MOCK && require('../mock/menu')

import axios from 'axios'
import _ from 'lodash'

const FW_MENU_LIST = 'FW_MENU_LIST'
const FW_OPEN_MENU = 'FW_OPEN_MENU'
const FW_CLOSE_MENU = 'FW_CLOSE_MENU'
const FW_ACTIVE_MENU = 'FW_ACTIVE_MENU'
const FW_SHOW_MSG = 'FW_SHOW_MSG'

const initState = {
    menus: [],
    openedMenus: [],
    activeMenuCode: 'bench'
}

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
        case FW_MENU_LIST:
            {
                return {
                    ...state,
                    menus: action.payload
                }
            }
        case FW_OPEN_MENU:
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
        case FW_CLOSE_MENU:
            {
                let menuCode = action.payload
                let openedMenus = _.filter(state.openedMenus, v => v.code !== menuCode)
                let activeMenuCode = state.activeMenuCode === menuCode ? (openedMenus.length > 0 ? openedMenus[0].code : null) : state.activeMenuCode
                if(!activeMenuCode){
                    activeMenuCode = 'bench'
                }
                return {
                    ...state,
                    openedMenus: openedMenus,
                    activeMenuCode: activeMenuCode
                }
            }
        case FW_ACTIVE_MENU: {
            let menuCode = action.payload
            return {
                ...state,
                activeMenuCode: menuCode
            }
        }
        default:
            return state
    }
}

function alasUrlToCode(data){
    for(var i =0; i<data.length;i++){
        var children = data[i].children
        for(var j=0;j<children.length;j++){
            var menu = children[j]
            menu.code = menu.url
        }
    }
    return data
}

export function getMenuList(userid) {
    return dispatch => {
        axios.get('/api/main/usermenulist',{params:{userid}})
            .then(res => {
                const { code, msg, data } = res.data
                if (code == 0) {
                    //做一下转义，将服务器返回结果的url别名为code
                    let aliasdata = alasUrlToCode(data)
                    dispatch({ type: FW_MENU_LIST, payload: aliasdata })
                } else {
                    dispatch({ type: FW_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}

export function openMenu(menuCode) {
    return {
        type: FW_OPEN_MENU,
        payload: menuCode
    }
}

export function closeMenu(menuCode) {
    return {
        type: FW_CLOSE_MENU,
        payload: menuCode
    }
}

export function activeMenu(menuCode) {
    return {
        type: FW_ACTIVE_MENU,
        payload: menuCode
    }
}