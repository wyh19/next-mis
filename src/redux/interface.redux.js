USE_MOCK && require('../mock/interface')

import axios from 'axios'
import _ from 'lodash'

const INTERFACE_SEARCH_FORM = 'INTERFACE_SEARCH_FORM'
const INTERFACE_GET_LIST = 'INTERFACE_GET_LIST'
const INTERFACE_HANDLE_MODAL_FORM = 'INTERFACE_HANDLE_MODAL_FORM'
const INTERFACE_ADD_INFO = 'INTERFACE_ADD_INFO'
const INTERFACE_EDIT_INFO = 'INTERFACE_EDIT_INFO'
const INTERFACE_DELETE_INFO = 'INTERFACE_DELETE_INFO'
const INTERFACE_SHOW_MSG = 'INTERFACE_SHOW_MSG'
const INTERFACE_GET_RIGHTS_LIST = 'INTERFACE_GET_RIGHTS_LIST'

const initState = {
    searchForm: {},
    modalOpen: false,
    formType: 'add',
    formData: {},
    dataList: [],
    msg: '',
    rightsList: [],
}

export function imterface(state = initState, action) {
    switch (action.type) {
        case INTERFACE_SEARCH_FORM: {
            return {
                ...state,
                searchForm: action.data
            }
        }
        case INTERFACE_GET_LIST: {
            return { ...state, dataList: action.payload }
        }
        case INTERFACE_GET_RIGHTS_LIST: {
            return { ...state, rightsList: action.payload }
        }
        case INTERFACE_HANDLE_MODAL_FORM: {
            return {
                ...state,
                formType: action.formType,
                modalOpen: action.modalOpen,
                formData: action.formData
            }
        }
        case INTERFACE_ADD_INFO: {
            let dataList = _.cloneDeep(state.dataList)
            dataList.push(action.data)
            return {
                ...state,
                modalOpen: false,
                dataList: dataList
            }
        }
        case INTERFACE_EDIT_INFO: {
            let dataList = _.cloneDeep(state.dataList)
            let toUpdate = _.find(dataList, item => (item.ID === action.data.ID))
            _.assign(toUpdate, action.data)
            return {
                ...state,
                modalOpen: false,
                dataList: dataList
            }
        }
        case INTERFACE_DELETE_INFO: {
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
        dispatch({ type: INTERFACE_SEARCH_FORM, data: params })
        axios.get('/api/interface/list', { params })
            .then(res => {
                dispatch({ type: INTERFACE_GET_LIST, payload: res.data })
            })
            .catch(e => {

            })
    }
}

export function handleModalForm(formType, modalOpen, formData) {
    return { type: INTERFACE_HANDLE_MODAL_FORM, formType, modalOpen, formData }
}

export function addInfo(info) {
    return dispatch => {
        axios.post('/api/interface/add', info)
            .then(res => {
                const { code, msg, data } = res.data
                if (code == 1) {
                    dispatch({ type: INTERFACE_ADD_INFO, msg, data })
                } else {
                    dispatch({ type: INTERFACE_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}

export function editInfo(info) {
    return dispatch => {
        axios.post('/api/interface/edit', info)
            .then(res => {
                const { code, msg, data } = res.data
                if (code == 1) {
                    dispatch({ type: INTERFACE_EDIT_INFO, msg, data })
                } else {
                    dispatch({ type: INTERFACE_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}

export function deleteInfo(ID) {
    return dispatch => {
        axios.post('/api/interface/delete', { ID })
            .then(res => {
                const { code, msg } = res.data
                if (code == 1) {
                    dispatch({ type: INTERFACE_DELETE_INFO, msg, ID })
                } else {
                    dispatch({ type: INTERFACE_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}

export function getRightsList() {
    return dispatch => {
        axios.get('/api/rights/list')
            .then(res => {
                dispatch({ type: INTERFACE_GET_RIGHTS_LIST, payload: res.data })
            })
            .catch(e => {

            })
    }
}