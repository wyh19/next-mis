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

export function menu(state = initState, action) {
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
        icon: 'car',
        text: 'JSON',
        children: [{
            text: '编辑器',
            code: 'jsoneditor'
        }]
    },
    {
        icon: 'coffee',
        text: 'Demo',
        children: [{
            text: '表格',
            code: 'table'
        },
        {
            text: '树',
            code: 'tree'
        },
        {
            text: '对话框',
            code: 'modal'
        }
        ]
    },
    {
        icon: 'rocket',
        text: '动画',
        children: [{
            text: '官方教程',
            code: 'official-animation'
        },
        {
            text: '基础动画',
            code: 'base-animation'
        },
        {
            text: '动画案例',
            code: 'example-animation'
        }
        ]
    },
    {
        icon: 'compass',
        text: '拖拽',
        children: [{
            text: 'Chess',
            code: 'chess'
        },
        {
            text: 'Dustbin',
            code: 'dustbin'
        },
        {
            text: 'DragAround',
            code: 'dragaround'
        },
        {
            text: 'Nesting',
            code: 'nesting'
        },
        {
            text: 'Sortable',
            code: 'sortable'
        },
        {
            text: 'Customize',
            code: 'customize'
        },
        {
            text: 'Other',
            code: 'other'
        }
        ]
    },
    {
        icon: 'exception',
        text: '关于',
        code: 'about'
    }
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