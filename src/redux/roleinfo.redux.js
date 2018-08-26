USE_MOCK && require('../mock/roleinfo')

import axios from 'axios'
import _ from 'lodash'

const ROLEINFO_SEARCH_FORM = 'ROLEINFO_SEARCH_FORM'
const ROLEINFO_GET_LIST = 'ROLEINFO_GET_LIST'
const ROLEINFO_HANDLE_MODAL_FORM = 'ROLEINFO_HANDLE_MODAL_FORM'
const ROLEINFO_ADD_INFO = 'ROLEINFO_ADD_INFO'
const ROLEINFO_EDIT_INFO = 'ROLEINFO_EDIT_INFO'
const ROLEINFO_DELETE_INFO = 'ROLEINFO_DELETE_INFO'
const ROLEINFO_SHOW_MSG = 'ROLEINFO_SHOW_MSG'
const ROLEINFO_GET_OPERATION_LIST = 'ROLEINFO_GET_OPERATION_LIST'

const initState = {
    searchForm: {},
    modalOpen: false,
    formType: 'add',
    formData: {},
    dataList: [],
    msg: '',
    operationList: [],
    pagination: {
        showSizeChanger: true,
        pageSize: 10,
        current: 1,
        total: 0
    }
}

export function roleinfo(state = initState, action) {
    switch (action.type) {
        case ROLEINFO_SEARCH_FORM: {
            return {
                ...state,
                searchForm: action.data
            }
        }
        case ROLEINFO_GET_LIST: {
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
        case ROLEINFO_GET_OPERATION_LIST: {
            return { ...state, operationList: action.payload }
        }
        case ROLEINFO_HANDLE_MODAL_FORM: {
            return {
                ...state,
                formType: action.formType,
                modalOpen: action.modalOpen,
                formData: action.formData
            }
        }
        case ROLEINFO_ADD_INFO: {
            let dataList = _.cloneDeep(state.dataList)
            dataList.unshift(action.data)
            let pagination = _.cloneDeep(state.pagination)
            pagination.total += 1
            return {
                ...state,
                modalOpen: false,
                dataList: dataList,
                pagination:pagination
            }
        }
        case ROLEINFO_EDIT_INFO: {
            let dataList = _.cloneDeep(state.dataList)
            let toUpdate = _.find(dataList, item => (item.id === action.data.id))
            _.assign(toUpdate, action.data)
            return {
                ...state,
                modalOpen: false,
                dataList: dataList
            }
        }
        case ROLEINFO_DELETE_INFO: {
            let dataList = _.cloneDeep(state.dataList)
            _.remove(dataList, item => item.id === action.id)
            let pagination = _.cloneDeep(state.pagination)
            pagination.total -= 1
            return {
                ...state,
                dataList: dataList,
                pagination: pagination
            }
        }
        default:
            return state
    }
}

export function getList(params) {
    return dispatch => {
        dispatch({ type: ROLEINFO_SEARCH_FORM, data: params })
        axios.get('/api/roleinfo/select', { params })
            .then(res => {
                const { code, msg, resultcounts, data } = res.data
                if (code == 0) {
                    dispatch({
                        type: ROLEINFO_GET_LIST,
                        payload: data,
                        total: resultcounts,
                        current: params.pagenum,
                        pageSize: params.pagesize
                    })
                } else {
                    dispatch({ type: ROLEINFO_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}

export function handleModalForm(formType, modalOpen, formData) {
    return { type: ROLEINFO_HANDLE_MODAL_FORM, formType, modalOpen, formData }
}

export function addInfo(info) {
    return dispatch => {
        axios.post('/api/roleinfo/add', info)
            .then(res => {
                const { code, msg, data } = res.data
                if (code == 0) {
                    dispatch({ type: ROLEINFO_ADD_INFO, msg, data })
                } else {
                    dispatch({ type: ROLEINFO_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}

export function editInfo(info) {
    return dispatch => {
        axios.post('/api/roleinfo/update', info)
            .then(res => {
                const { code, msg, data } = res.data
                if (code == 0) {
                    dispatch({ type: ROLEINFO_EDIT_INFO, msg, data })
                } else {
                    dispatch({ type: ROLEINFO_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}

export function deleteInfo(id) {
    return dispatch => {
        axios.get('/api/roleinfo/delete',  { params: { id } })
            .then(res => {
                const { code, msg } = res.data
                if (code == 0) {
                    dispatch({ type: ROLEINFO_DELETE_INFO, msg, id })
                } else {
                    dispatch({ type: ROLEINFO_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}

export function getOperationList() {
    return dispatch => {
        axios.get('/api/operation/select')
            .then(res => {
                const { code, msg,  data } = res.data
                if (code == 0) {
                    dispatch({
                        type: ROLEINFO_GET_OPERATION_LIST,
                        payload: data,
                    })
                } else {
                    dispatch({ type: ROLEINFO_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}
