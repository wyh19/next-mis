USE_MOCK && require('../mock/operation')

import axios from 'axios'
import _ from 'lodash'

const OPERATION_SEARCH_FORM = 'OPERATION_SEARCH_FORM'
const OPERATION_GET_LIST = 'OPERATION_GET_LIST'
const OPERATION_HANDLE_MODAL_FORM = 'OPERATION_HANDLE_MODAL_FORM'
const OPERATION_ADD_INFO = 'OPERATION_ADD_INFO'
const OPERATION_EDIT_INFO = 'OPERATION_EDIT_INFO'
const OPERATION_DELETE_INFO = 'OPERATION_DELETE_INFO'
const OPERATION_SHOW_MSG = 'OPERATION_SHOW_MSG'

const initState = {
    searchForm: {},
    modalOpen: false,
    formType: 'add',
    formData: {},
    dataList: [],
    msg: '',
    roleList: [],
    pagination: {
        showSizeChanger: true,
        pageSize: 10,
        current: 1,
        total: 0
    }
}

export function operation(state = initState, action) {
    switch (action.type) {
        case OPERATION_SEARCH_FORM: {
            return {
                ...state,
                searchForm: action.data
            }
        }
        case OPERATION_GET_LIST: {
            let pagination = _.cloneDeep(state.pagination)
            pagination.total = action.total
            pagination.current = action.current
            pagination.pageSize = action.pageSize
            return {
                ...state,
                dataList: action.payload,
                pagination: pagination
            }
        }
        case OPERATION_HANDLE_MODAL_FORM: {
            return {
                ...state,
                formType: action.formType,
                modalOpen: action.modalOpen,
                formData: action.formData
            }
        }
        case OPERATION_ADD_INFO: {
            let dataList = _.cloneDeep(state.dataList)
            dataList.unshift(action.data)
            let pagination = _.cloneDeep(state.pagination)
            pagination.total += 1
            return {
                ...state,
                modalOpen: false,
                dataList: dataList,
                pagination
            }
        }
        case OPERATION_EDIT_INFO: {
            let dataList = _.cloneDeep(state.dataList)
            let toUpdate = _.find(dataList, item => (item.id === action.data.id))
            _.assign(toUpdate, action.data)
            return {
                ...state,
                modalOpen: false,
                dataList: dataList,
            }
        }
        case OPERATION_DELETE_INFO: {
            let dataList = _.cloneDeep(state.dataList)
            _.remove(dataList, item => item.id === action.id)
            let pagination = _.cloneDeep(state.pagination)
            pagination.total -= 1
            return {
                ...state,
                dataList: dataList,
                pagination
            }
        }
        default:
            return state
    }
}

export function getList(params) {
    return dispatch => {
        dispatch({ type: OPERATION_SEARCH_FORM, data: params })
        axios.get('/api/operation/select', { params })
            .then(res => {
                const { code, msg, resultcounts, data } = res.data
                if (code == 0) {
                    dispatch({
                        type: OPERATION_GET_LIST,
                        payload: data,
                        total: resultcounts,
                        current: params.pagenum,
                        pageSize: params.pagesize
                    })
                } else {
                    dispatch({ type: OPERATION_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}

export function handleModalForm(formType, modalOpen, formData) {
    return { type: OPERATION_HANDLE_MODAL_FORM, formType, modalOpen, formData }
}

export function addInfo(info) {
    return dispatch => {
        axios.post('/api/operation/add', info)
            .then(res => {
                const { code, msg, data } = res.data
                if (code == 0) {
                    dispatch({ type: OPERATION_ADD_INFO, msg, data })
                } else {
                    dispatch({ type: OPERATION_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}

export function editInfo(info) {
    return dispatch => {
        axios.post('/api/operation/update', info)
            .then(res => {
                const { code, msg, data } = res.data
                if (code == 0) {
                    dispatch({ type: OPERATION_EDIT_INFO, msg, data })
                } else {
                    dispatch({ type: OPERATION_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}

export function deleteInfo(id) {
    return dispatch => {
        axios.get('/api/operation/delete',  { params: { id } })
            .then(res => {
                const { code, msg } = res.data
                if (code == 0) {
                    dispatch({ type: OPERATION_DELETE_INFO, msg, id })
                } else {
                    dispatch({ type: OPERATION_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}

