USE_MOCK && require('../mock/rights')

import axios from 'axios'
import _ from 'lodash'

const RIGHTS_SEARCH_FORM = 'RIGHTS_SEARCH_FORM'
const RIGHTS_GET_LIST = 'RIGHTS_GET_LIST'
const RIGHTS_GET_MENU_LIST = 'RIGHTS_GET_MENU_LIST'
const RIGHTS_HANDLE_MODAL_FORM = 'RIGHTS_HANDLE_MODAL_FORM'
const RIGHTS_ADD_INFO = 'RIGHTS_ADD_INFO'
const RIGHTS_EDIT_INFO = 'RIGHTS_EDIT_INFO'
const RIGHTS_DELETE_INFO = 'RIGHTS_DELETE_INFO'
const RIGHTS_SHOW_MSG = 'RIGHTS_SHOW_MSG'

const initState = {
    searchForm: {},
    modalOpen: false,
    formType: 'add',
    formData: {},
    dataList: [],
    msg: '',
    menuList:[]
}

export function rights(state = initState, action) {
    switch (action.type) {
        case RIGHTS_SEARCH_FORM: {
            return {
                ...state,
                searchForm: action.data
            }
        }
        case RIGHTS_GET_LIST: {
            return { ...state, dataList: action.payload }
        }
        case RIGHTS_GET_MENU_LIST: {
            return { ...state, menuList: action.payload }
        }
        case RIGHTS_HANDLE_MODAL_FORM: {
            return {
                ...state,
                formType: action.formType,
                modalOpen: action.modalOpen,
                formData: action.formData
            }
        }
        case RIGHTS_ADD_INFO: {
            let dataList = _.cloneDeep(state.dataList)
            dataList.push(action.data)
            return {
                ...state,
                modalOpen: false,
                dataList: dataList
            }
        }
        case RIGHTS_EDIT_INFO: {
            let dataList = _.cloneDeep(state.dataList)
            let toUpdate = _.find(dataList, item => (item.ID === action.data.ID))
            _.assign(toUpdate, action.data)
            return {
                ...state,
                modalOpen: false,
                dataList: dataList
            }
        }
        case RIGHTS_DELETE_INFO: {
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
        dispatch({ type: RIGHTS_SEARCH_FORM, data: params })
        axios.get('/api/rights/list', { params })
            .then(res => {
                dispatch({ type: RIGHTS_GET_LIST, payload: res.data })
            })
            .catch(e => {

            })
    }
}

export function handleModalForm(formType, modalOpen, formData) {
    return { type: RIGHTS_HANDLE_MODAL_FORM, formType, modalOpen, formData }
}

export function addInfo(info) {
    return dispatch => {
        axios.post('/api/rights/add', info)
            .then(res => {
                const { code, msg, data } = res.data
                if (code == 1) {
                    dispatch({ type: RIGHTS_ADD_INFO, msg, data })
                } else {
                    dispatch({ type: RIGHTS_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}

export function editInfo(info) {
    return dispatch => {
        axios.post('/api/rights/edit', info)
            .then(res => {
                const { code, msg, data } = res.data
                if (code == 1) {
                    dispatch({ type: RIGHTS_EDIT_INFO, msg, data })
                } else {
                    dispatch({ type: RIGHTS_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}

export function deleteInfo(ID) {
    return dispatch => {
        axios.post('/api/rights/delete', { ID })
            .then(res => {
                const { code, msg } = res.data
                if (code == 1) {
                    dispatch({ type: RIGHTS_DELETE_INFO, msg, ID })
                } else {
                    dispatch({ type: RIGHTS_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}

export function getMenuList() {
    return dispatch => {
        axios.get('/api/menu/list')
            .then(res => {
                dispatch({ type: RIGHTS_GET_MENU_LIST, payload: res.data })
            })
            .catch(e => {

            })
    }
}