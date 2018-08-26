USE_MOCK && require('../mock/userinfo')

import axios from 'axios'
import _ from 'lodash'

const USERINFO_SEARCH_FORM = 'USERINFO_SEARCH_FORM'
const USERINFO_GET_LIST = 'USERINFO_GET_LIST'
const USERINFO_HANDLE_MODAL_FORM = 'USERINFO_HANDLE_MODAL_FORM'
const USERINFO_ADD_INFO = 'USERINFO_ADD_INFO'
const USERINFO_EDIT_INFO = 'USERINFO_EDIT_INFO'
const USERINFO_DELETE_INFO = 'USERINFO_DELETE_INFO'
const USERINFO_SHOW_MSG = 'USERINFO_SHOW_MSG'
const USERINFO_GET_ORG_LIST = 'USERINFO_GET_ORG_LIST'
const USERINFO_GET_GROUP_LIST = 'USERINFO_GET_GROUP_LIST'

const initState = {
    searchForm: {},
    modalOpen: false,
    formType: 'add',
    formData: {},
    dataList: [],
    msg: '',
    orgaList: [],
    groupList:[],
    pagination: {
        showSizeChanger: true,
        pageSize: 10,
        current: 1,
        total: 0
    }
}

export function userinfo(state = initState, action) {
    switch (action.type) {
        case USERINFO_SEARCH_FORM: {
            return {
                ...state,
                searchForm: action.data
            }
        }
        case USERINFO_GET_LIST: {
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
        case USERINFO_GET_ORG_LIST: {
            return { ...state, orgaList: action.payload }
        }
        case USERINFO_GET_GROUP_LIST: {
            return { ...state, groupList: action.payload }
        }
        case USERINFO_HANDLE_MODAL_FORM: {
            return {
                ...state,
                formType: action.formType,
                modalOpen: action.modalOpen,
                formData: action.formData
            }
        }
        case USERINFO_ADD_INFO: {
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
        case USERINFO_EDIT_INFO: {
            let dataList = _.cloneDeep(state.dataList)
            let toUpdate = _.find(dataList, item => (item.id === action.data.id))
            _.assign(toUpdate, action.data)
            return {
                ...state,
                modalOpen: false,
                dataList: dataList,
            }
        }
        case USERINFO_DELETE_INFO: {
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
        dispatch({ type: USERINFO_SEARCH_FORM, data: params })
        axios.get('/api/userinfo/select', { params })
            .then(res => {
                const { code, msg, resultcounts, data } = res.data
                if (code == 0) {
                    dispatch({
                        type: USERINFO_GET_LIST,
                        payload: data,
                        total: resultcounts,
                        current: params.pagenum,
                        pageSize: params.pagesize
                    })
                } else {
                    dispatch({ type: USERINFO_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}

export function handleModalForm(formType, modalOpen, formData) {
    return { type: USERINFO_HANDLE_MODAL_FORM, formType, modalOpen, formData }
}

export function addInfo(info) {
    return dispatch => {
        axios.post('/api/userinfo/add', info)
            .then(res => {
                const { code, msg, data } = res.data
                if (code == 0) {
                    dispatch({ type: USERINFO_ADD_INFO, msg, data })
                } else {
                    dispatch({ type: USERINFO_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}

export function editInfo(info) {
    return dispatch => {
        axios.post('/api/userinfo/update', info)
            .then(res => {
                const { code, msg, data } = res.data
                if (code == 0) {
                    dispatch({ type: USERINFO_EDIT_INFO, msg, data })
                } else {
                    dispatch({ type: USERINFO_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}

export function deleteInfo(id) {
    return dispatch => {
        axios.get('/api/userinfo/delete',  { params: { id } })
            .then(res => {
                const { code, msg } = res.data
                if (code == 0) {
                    dispatch({ type: USERINFO_DELETE_INFO, msg, id })
                } else {
                    dispatch({ type: USERINFO_SHOW_MSG, msg })
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
                        type: USERINFO_GET_ORG_LIST,
                        payload: data,
                    })
                } else {
                    dispatch({ type: USERINFO_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}

export function getGroupList() {
    return dispatch => {
        axios.get('/api/usergroup/select')
            .then(res => {
                const { code, msg,  data } = res.data
                if (code == 0) {
                    dispatch({
                        type: USERINFO_GET_GROUP_LIST,
                        payload: data,
                    })
                } else {
                    dispatch({ type: USERINFO_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}