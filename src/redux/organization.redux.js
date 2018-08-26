USE_MOCK && require('../mock/organization')

import axios from 'axios'
import _ from 'lodash'

const ORG_SEARCH_FORM = 'ORG_SEARCH_FORM'
const ORG_GET_LIST = 'ORG_GET_LIST'
const ORG_HANDLE_MODAL_FORM = 'ORG_HANDLE_MODAL_FORM'
const ORG_ADD_INFO = 'ORG_ADD_INFO'
const ORG_EDIT_INFO = 'ORG_EDIT_INFO'
const ORG_DELETE_INFO = 'ORG_DELETE_INFO'
const ORG_SHOW_MSG = 'ORG_SHOW_MSG'

const initState = {
    searchForm: {},
    modalOpen: false,
    formType: 'add',
    formData: {},
    dataList: [],
    msg: '',
    pagination: {
        showSizeChanger: true,
        pageSize: 10,
        current: 1,
        total: 0
    }
}

export function organization(state = initState, action) {
    switch (action.type) {
        case ORG_SEARCH_FORM: {
            return {
                ...state,
                searchForm: action.data
            }
        }
        case ORG_GET_LIST: {
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
        case ORG_HANDLE_MODAL_FORM: {
            return {
                ...state,
                formType: action.formType,
                modalOpen: action.modalOpen,
                formData: action.formData
            }
        }
        case ORG_ADD_INFO: {
            let dataList = _.cloneDeep(state.dataList)
            dataList.unshift(action.data)
            let pagination = _.cloneDeep(state.pagination)
            pagination.total += 1
            return {
                ...state,
                modalOpen: false,
                dataList: dataList,
                pagination: pagination
            }
        }
        case ORG_EDIT_INFO: {
            let dataList = _.cloneDeep(state.dataList)
            let toUpdate = _.find(dataList, item => (item.id === action.data.id))
            _.assign(toUpdate, action.data)
            return {
                ...state,
                modalOpen: false,
                dataList: dataList
            }
        }
        case ORG_DELETE_INFO: {
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
        dispatch({ type: ORG_SEARCH_FORM, data: params })
        axios.get('/api/organization/select', { params })
            .then(res => {
                const { code, msg, resultcounts, data } = res.data
                if (code == 0) {
                    dispatch({
                        type: ORG_GET_LIST,
                        payload: data,
                        total: resultcounts,
                        current: params.pagenum,
                        pageSize: params.pagesize
                    })
                } else {
                    dispatch({ type: ORG_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}

export function handleModalForm(formType, modalOpen, formData) {
    return { type: ORG_HANDLE_MODAL_FORM, formType, modalOpen, formData }
}

export function addInfo(info) {
    return dispatch => {
        axios.post('/api/organization/add', info)
            .then(res => {
                const { code, msg, data } = res.data
                if (code == 0) {
                    dispatch({ type: ORG_ADD_INFO, msg, data })
                } else {
                    dispatch({ type: ORG_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}

export function editInfo(info) {
    return dispatch => {
        axios.post('/api/organization/update', info)
            .then(res => {
                const { code, msg, data } = res.data
                if (code == 0) {
                    dispatch({ type: ORG_EDIT_INFO, msg, data })
                } else {
                    dispatch({ type: ORG_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}

export function deleteInfo(id) {
    return dispatch => {
        axios.get('/api/organization/delete', { params: { id } })
            .then(res => {
                const { code, msg } = res.data
                if (code == 0) {
                    dispatch({ type: ORG_DELETE_INFO, msg, id })
                } else {
                    dispatch({ type: ORG_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}