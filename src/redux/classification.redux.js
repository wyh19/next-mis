USE_MOCK && require('../mock/classification')

import axios from 'axios'
import _ from 'lodash'

const CLASSIFICATION_SEARCH_FORM = 'CLASSIFICATION_SEARCH_FORM'
const CLASSIFICATION_GET_LIST = 'CLASSIFICATION_GET_LIST'
const CLASSIFICATION_HANDLE_MODAL_FORM = 'CLASSIFICATION_HANDLE_MODAL_FORM'
const CLASSIFICATION_ADD_INFO = 'CLASSIFICATION_ADD_INFO'
const CLASSIFICATION_EDIT_INFO = 'CLASSIFICATION_EDIT_INFO'
const CLASSIFICATION_DELETE_INFO = 'CLASSIFICATION_DELETE_INFO'
const CLASSIFICATION_SHOW_MSG = 'CLASSIFICATION_SHOW_MSG'
const CLASSIFICATION_GET_ORG_LIST = 'CLASSIFICATION_GET_ORG_LIST'
const CLASSIFICATION_GET_API_LIST = 'CLASSIFICATION_GET_API_LIST'

const initState = {
    searchForm: {},
    modalOpen: false,
    formType: 'add',
    formData: {},
    dataList: [],
    msg: '',
    orgaList: [],
    apiList:[],
    pagination: {
        showSizeChanger: true,
        pageSize: 10,
        current: 1,
        total: 0
    }
}

export function classification(state = initState, action) {
    switch (action.type) {
        case CLASSIFICATION_SEARCH_FORM: {
            return {
                ...state,
                searchForm: action.data
            }
        }
        case CLASSIFICATION_GET_LIST: {
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
        case CLASSIFICATION_GET_ORG_LIST: {
            return { ...state, orgaList: action.payload }
        }
        case CLASSIFICATION_GET_API_LIST: {
            return { ...state, apiList: action.payload }
        }
        case CLASSIFICATION_HANDLE_MODAL_FORM: {
            return {
                ...state,
                formType: action.formType,
                modalOpen: action.modalOpen,
                formData: action.formData
            }
        }
        case CLASSIFICATION_ADD_INFO: {
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
        case CLASSIFICATION_EDIT_INFO: {
            let dataList = _.cloneDeep(state.dataList)
            let toUpdate = _.find(dataList, item => (item.id === action.data.id))
            _.assign(toUpdate, action.data)
            return {
                ...state,
                modalOpen: false,
                dataList: dataList
            }
        }
        case CLASSIFICATION_DELETE_INFO: {
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
        dispatch({ type: CLASSIFICATION_SEARCH_FORM, data: params })
        axios.get('/api/classification/select', { params })
            .then(res => {
                const { code, msg, resultcounts, data } = res.data
                if (code == 0) {
                    dispatch({
                        type: CLASSIFICATION_GET_LIST,
                        payload: data,
                        total: resultcounts,
                        current: params.pagenum,
                        pageSize: params.pagesize
                    })
                } else {
                    dispatch({ type: CLASSIFICATION_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}

export function handleModalForm(formType, modalOpen, formData) {
    return { type: CLASSIFICATION_HANDLE_MODAL_FORM, formType, modalOpen, formData }
}

export function addInfo(info) {
    return dispatch => {
        axios.post('/api/classification/add', info)
            .then(res => {
                const { code, msg, data } = res.data
                if (code == 0) {
                    dispatch({ type: CLASSIFICATION_ADD_INFO, msg, data })
                } else {
                    dispatch({ type: CLASSIFICATION_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}

export function editInfo(info) {
    return dispatch => {
        axios.post('/api/classification/update', info)
            .then(res => {
                const { code, msg, data } = res.data
                if (code == 0) {
                    dispatch({ type: CLASSIFICATION_EDIT_INFO, msg, data })
                } else {
                    dispatch({ type: CLASSIFICATION_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}

export function deleteInfo(id) {
    return dispatch => {
        axios.get('/api/classification/delete',  { params: { id } })
            .then(res => {
                const { code, msg } = res.data
                if (code == 0) {
                    dispatch({ type: CLASSIFICATION_DELETE_INFO, msg, id })
                } else {
                    dispatch({ type: CLASSIFICATION_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}

export function getOrgList() {
    return dispatch => {
        axios.get('/api/organization/select')
            .then(res => {
                const { code, msg,  data } = res.data
                if (code == 0) {
                    dispatch({
                        type: CLASSIFICATION_GET_ORG_LIST,
                        payload: data,
                    })
                } else {
                    dispatch({ type: CLASSIFICATION_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}

export function getApiList() {
    return dispatch => {
        axios.get('/api/api/select')
            .then(res => {
                const { code, msg,  data } = res.data
                if (code == 0) {
                    dispatch({
                        type: CLASSIFICATION_GET_API_LIST,
                        payload: data,
                    })
                } else {
                    dispatch({ type: CLASSIFICATION_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}