USE_MOCK && require('../mock/user')

import axios from 'axios'
import _ from 'lodash'

const USER_SEARCH_FORM = 'USER_SEARCH_FORM'
const USER_GET_LIST = 'USER_GET_LIST'
const USER_HANDLE_MODAL_FORM = 'USER_HANDLE_MODAL_FORM'
const USER_ADD_INFO = 'USER_ADD_INFO'
const USER_EDIT_INFO = 'USER_EDIT_INFO'
const USER_DELETE_INFO = 'USER_DELETE_INFO'
const USER_SHOW_MSG = 'USER_SHOW_MSG'
const USER_GET_ORGA_LIST = 'USER_GET_ORGA_LIST'

const initState = {
    searchForm: {},
    modalOpen: false,
    formType: 'add',
    formData: {},
    dataList: [],
    msg: '',
    orgaList: [],
}

export function user(state = initState, action) {
    switch (action.type) {
        case USER_SEARCH_FORM: {
            return {
                ...state,
                searchForm: action.data
            }
        }
        case USER_GET_LIST: {
            return { ...state, dataList: action.payload }
        }
        case USER_GET_ORGA_LIST: {
            return { ...state, orgaList: action.payload }
        }
        case USER_HANDLE_MODAL_FORM: {
            return {
                ...state,
                formType: action.formType,
                modalOpen: action.modalOpen,
                formData: action.formData
            }
        }
        case USER_ADD_INFO: {
            let dataList = _.cloneDeep(state.dataList)
            dataList.push(action.data)
            return {
                ...state,
                modalOpen: false,
                dataList: dataList
            }
        }
        case USER_EDIT_INFO: {
            let dataList = _.cloneDeep(state.dataList)
            let toUpdate = _.find(dataList, item => (item.ID === action.data.ID))
            _.assign(toUpdate, action.data)
            return {
                ...state,
                modalOpen: false,
                dataList: dataList
            }
        }
        case USER_DELETE_INFO: {
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
        dispatch({ type: USER_SEARCH_FORM, data: params })
        axios.get('/api/user/list', { params })
            .then(res => {
                dispatch({ type: USER_GET_LIST, payload: res.data })
            })
            .catch(e => {

            })
    }
}

export function handleModalForm(formType, modalOpen, formData) {
    return { type: USER_HANDLE_MODAL_FORM, formType, modalOpen, formData }
}

export function addInfo(info) {
    return dispatch => {
        axios.post('/api/user/add', info)
            .then(res => {
                const { code, msg, data } = res.data
                if (code == 1) {
                    dispatch({ type: USER_ADD_INFO, msg, data })
                } else {
                    dispatch({ type: USER_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}

export function editInfo(info) {
    return dispatch => {
        axios.post('/api/user/edit', info)
            .then(res => {
                const { code, msg, data } = res.data
                if (code == 1) {
                    dispatch({ type: USER_EDIT_INFO, msg, data })
                } else {
                    dispatch({ type: USER_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}

export function deleteInfo(ID) {
    return dispatch => {
        axios.post('/api/user/delete', { ID })
            .then(res => {
                const { code, msg } = res.data
                if (code == 1) {
                    dispatch({ type: USER_DELETE_INFO, msg, ID })
                } else {
                    dispatch({ type: USER_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}

export function getOrgaList() {
    return dispatch => {
        axios.get('/api/orga/list')
            .then(res => {
                dispatch({ type: USER_GET_ORGA_LIST, payload: res.data })
            })
            .catch(e => {

            })
    }
}