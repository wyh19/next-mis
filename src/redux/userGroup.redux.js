USE_MOCK && require('../mock/userGroup')

import axios from 'axios'
import _ from 'lodash'

const USERGROUP_SEARCH_FORM = 'USERGROUP_SEARCH_FORM'
const USERGROUP_GET_LIST = 'USERGROUP_GET_LIST'
const USERGROUP_HANDLE_MODAL_FORM = 'USERGROUP_HANDLE_MODAL_FORM'
const USERGROUP_ADD_INFO = 'USERGROUP_ADD_INFO'
const USERGROUP_EDIT_INFO = 'USERGROUP_EDIT_INFO'
const USERGROUP_DELETE_INFO = 'USERGROUP_DELETE_INFO'
const USERGROUP_SHOW_MSG = 'USERGROUP_SHOW_MSG'
const USERGROUP_GET_USER_LIST = 'USERGROUP_GET_USER_LIST'
const USERGROUP_GET_ROLE_LIST = 'USERGROUP_GET_ROLE_LIST'

const initState = {
    searchForm: {},
    modalOpen: false,
    formType: 'add',
    formData: {},
    dataList: [],
    msg: '',
    userList: [],
    roleList:[],
}

export function userGroup(state = initState, action) {
    switch (action.type) {
        case USERGROUP_SEARCH_FORM: {
            return {
                ...state,
                searchForm: action.data
            }
        }
        case USERGROUP_GET_LIST: {
            return { ...state, dataList: action.payload }
        }
        case USERGROUP_GET_USER_LIST: {
            return { ...state, userList: action.payload }
        }
        case USERGROUP_GET_ROLE_LIST: {
            return { ...state, roleList: action.payload }
        }
        case USERGROUP_HANDLE_MODAL_FORM: {
            return {
                ...state,
                formType: action.formType,
                modalOpen: action.modalOpen,
                formData: action.formData
            }
        }
        case USERGROUP_ADD_INFO: {
            let dataList = _.cloneDeep(state.dataList)
            dataList.push(action.data)
            return {
                ...state,
                modalOpen: false,
                dataList: dataList
            }
        }
        case USERGROUP_EDIT_INFO: {
            let dataList = _.cloneDeep(state.dataList)
            let toUpdate = _.find(dataList, item => (item.ID === action.data.ID))
            _.assign(toUpdate, action.data)
            return {
                ...state,
                modalOpen: false,
                dataList: dataList
            }
        }
        case USERGROUP_DELETE_INFO: {
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
        dispatch({ type: USERGROUP_SEARCH_FORM, data: params })
        axios.get('/api/userGroup/list', { params })
            .then(res => {
                dispatch({ type: USERGROUP_GET_LIST, payload: res.data })
            })
            .catch(e => {

            })
    }
}

export function handleModalForm(formType, modalOpen, formData) {
    return { type: USERGROUP_HANDLE_MODAL_FORM, formType, modalOpen, formData }
}

export function addInfo(info) {
    return dispatch => {
        axios.post('/api/userGroup/add', info)
            .then(res => {
                const { code, msg, data } = res.data
                if (code == 1) {
                    dispatch({ type: USERGROUP_ADD_INFO, msg, data })
                } else {
                    dispatch({ type: USERGROUP_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}

export function editInfo(info) {
    return dispatch => {
        axios.post('/api/userGroup/edit', info)
            .then(res => {
                const { code, msg, data } = res.data
                if (code == 1) {
                    dispatch({ type: USERGROUP_EDIT_INFO, msg, data })
                } else {
                    dispatch({ type: USERGROUP_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}

export function deleteInfo(ID) {
    return dispatch => {
        axios.post('/api/userGroup/delete', { ID })
            .then(res => {
                const { code, msg } = res.data
                if (code == 1) {
                    dispatch({ type: USERGROUP_DELETE_INFO, msg, ID })
                } else {
                    dispatch({ type: USERGROUP_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}

export function getUserList() {
    return dispatch => {
        axios.get('/api/user/list')
            .then(res => {
                dispatch({ type: USERGROUP_GET_USER_LIST, payload: res.data })
            })
            .catch(e => {

            })
    }
}

export function getRoleList() {
    return dispatch => {
        axios.get('/api/role/list')
            .then(res => {
                dispatch({ type: USERGROUP_GET_ROLE_LIST, payload: res.data })
            })
            .catch(e => {

            })
    }
}