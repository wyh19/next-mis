USE_MOCK && require('../mock/project')

import axios from 'axios'
import _ from 'lodash'

const PROJECT_SEARCH_FORM = 'PROJECT_SEARCH_FORM'
const PROJECT_GET_LIST = 'PROJECT_GET_LIST'
const PROJECT_HANDLE_MODAL_FORM = 'PROJECT_HANDLE_MODAL_FORM'
const PROJECT_ADD_INFO = 'PROJECT_ADD_INFO'
const PROJECT_EDIT_INFO = 'PROJECT_EDIT_INFO'
const PROJECT_DELETE_INFO = 'PROJECT_DELETE_INFO'
const PROJECT_SHOW_MSG = 'PROJECT_SHOW_MSG'
const PROJECT_GET_ORG_LIST = 'PROJECT_GET_ORG_LIST'
const PROJECT_GET_USERINFO_LIST = 'PROJECT_GET_USERINFO_LIST'

const initState = {
    searchForm: {},
    modalOpen: false,
    formType: 'add',
    formData: {},
    dataList: [],
    msg: '',
    orgList: [],
    userinfoList:[],
    pagination: {
        showSizeChanger: true,
        pageSize: 10,
        current: 1,
        total: 0
    }
}

export function project(state = initState, action) {
    switch (action.type) {
        case PROJECT_SEARCH_FORM: {
            return {
                ...state,
                searchForm: action.data
            }
        }
        case PROJECT_GET_LIST: {
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
        case PROJECT_GET_ORG_LIST: {
            return { ...state, orgList: action.payload }
        }
        case PROJECT_GET_USERINFO_LIST: {
            return { ...state, userinfoList: action.payload }
        }
        case PROJECT_HANDLE_MODAL_FORM: {
            return {
                ...state,
                formType: action.formType,
                modalOpen: action.modalOpen,
                formData: action.formData
            }
        }
        case PROJECT_ADD_INFO: {
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
        case PROJECT_EDIT_INFO: {
            let dataList = _.cloneDeep(state.dataList)
            let toUpdate = _.find(dataList, item => (item.id === action.data.id))
            _.assign(toUpdate, action.data)
            return {
                ...state,
                modalOpen: false,
                dataList: dataList
            }
        }
        case PROJECT_DELETE_INFO: {
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
        dispatch({ type: PROJECT_SEARCH_FORM, data: params })
        axios.get('/api/project/select', { params })
            .then(res => {
                const { code, msg, resultcounts, data } = res.data
                if (code == 0) {
                    dispatch({
                        type: PROJECT_GET_LIST,
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
    return { type: PROJECT_HANDLE_MODAL_FORM, formType, modalOpen, formData }
}

export function addInfo(info) {
    return dispatch => {
        axios.post('/api/project/add', info)
            .then(res => {
                const { code, msg, data } = res.data
                if (code == 0) {
                    dispatch({ type: PROJECT_ADD_INFO, msg, data })
                } else {
                    dispatch({ type: PROJECT_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}

export function editInfo(info) {
    return dispatch => {
        axios.post('/api/project/update', info)
            .then(res => {
                const { code, msg, data } = res.data
                if (code == 0) {
                    dispatch({ type: PROJECT_EDIT_INFO, msg, data })
                } else {
                    dispatch({ type: PROJECT_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}

export function deleteInfo(id) {
    return dispatch => {
        axios.get('/api/project/delete',  { params: { id } })
            .then(res => {
                const { code, msg } = res.data
                if (code == 0) {
                    dispatch({ type: PROJECT_DELETE_INFO, msg, id })
                } else {
                    dispatch({ type: PROJECT_SHOW_MSG, msg })
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
                        type: PROJECT_GET_ORG_LIST,
                        payload: data,
                    })
                } else {
                    dispatch({ type: PROJECT_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}

export function getUserinfoList() {
    return dispatch => {
        axios.get('/api/userinfo/select')
            .then(res => {
                const { code, msg,  data } = res.data
                if (code == 0) {
                    dispatch({
                        type: PROJECT_GET_USERINFO_LIST,
                        payload: data,
                    })
                } else {
                    dispatch({ type: PROJECT_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}
