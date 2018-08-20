USE_MOCK && require('../mock/menu')

import axios from 'axios'
import _ from 'lodash'

const MENU_SEARCH_FORM = 'MENU_SEARCH_FORM'
const MENU_GET_LIST = 'MENU_GET_LIST'
const MENU_HANDLE_MODAL_FORM = 'MENU_HANDLE_MODAL_FORM'
const MENU_ADD_INFO = 'MENU_ADD_INFO'
const MENU_EDIT_INFO = 'MENU_EDIT_INFO'
const MENU_DELETE_INFO = 'MENU_DELETE_INFO'
const MENU_SHOW_MSG = 'MENU_SHOW_MSG'

const initState = {
    searchForm: {},
    modalOpen: false,
    formType: 'add',
    formData: {},
    dataList: [],
    msg: '',
}

export function menu(state = initState, action) {
    switch (action.type) {
        case MENU_SEARCH_FORM: {
            return {
                ...state,
                searchForm: action.data
            }
        }
        case MENU_GET_LIST: {
            return { ...state, dataList: action.payload }
        }
        case MENU_HANDLE_MODAL_FORM: {
            return {
                ...state,
                formType: action.formType,
                modalOpen: action.modalOpen,
                formData: action.formData
            }
        }
        case MENU_ADD_INFO: {
            let dataList = _.cloneDeep(state.dataList)
            dataList.push(action.data)
            return {
                ...state,
                modalOpen: false,
                dataList: dataList
            }
        }
        case MENU_EDIT_INFO: {
            let dataList = _.cloneDeep(state.dataList)
            let toUpdate = _.find(dataList, item => (item.ID === action.data.ID))
            _.assign(toUpdate, action.data)
            return {
                ...state,
                modalOpen: false,
                dataList: dataList
            }
        }
        case MENU_DELETE_INFO: {
            let dataList = _.cloneDeep(state.dataList)
            _.remove(dataList, item => item.ID === action.ID)
            return {
                ...state,
                dataList: dataList
            }
        }
        default:
            return state
    }
}

export function getList(params) {
    return dispatch => {
        dispatch({ type: MENU_SEARCH_FORM, data: params })
        axios.get('/api/menu/list', { params })
            .then(res => {
                dispatch({ type: MENU_GET_LIST, payload: res.data })
            })
            .catch(e => {

            })
    }
}

export function handleModalForm(formType, modalOpen, formData) {
    return { type: MENU_HANDLE_MODAL_FORM, formType, modalOpen, formData }
}

export function addInfo(info) {
    return dispatch => {
        axios.post('/api/menu/add', info)
            .then(res => {
                const { code, msg, data } = res.data
                if (code == 1) {
                    dispatch({ type: MENU_ADD_INFO, msg, data })
                } else {
                    dispatch({ type: MENU_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}

export function editInfo(info) {
    return dispatch => {
        axios.post('/api/menu/edit', info)
            .then(res => {
                const { code, msg, data } = res.data
                if (code == 1) {
                    dispatch({ type: MENU_EDIT_INFO, msg, data })
                } else {
                    dispatch({ type: MENU_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}

export function deleteInfo(ID) {
    return dispatch => {
        axios.post('/api/menu/delete', { ID })
            .then(res => {
                const { code, msg } = res.data
                if (code == 1) {
                    dispatch({ type: MENU_DELETE_INFO, msg, ID })
                } else {
                    dispatch({ type: MENU_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}
