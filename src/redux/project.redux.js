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
const PROJECT_GET_PROJMANAGER_LIST = 'PROJECT_GET_PROJMANAGER_LIST'

const initState = {
    searchForm: {},
    modalOpen: false,
    formType: 'add',
    formData: {},
    dataList: [],
    msg: '',
    projManagerList: [],
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
            return { ...state, dataList: action.payload }
        }
        case PROJECT_GET_PROJMANAGER_LIST: {
            return { ...state, projManagerList: action.payload }
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
            dataList.push(action.data)
            return {
                ...state,
                modalOpen: false,
                dataList: dataList
            }
        }
        case PROJECT_EDIT_INFO: {
            let dataList = _.cloneDeep(state.dataList)
            let toUpdate = _.find(dataList, item => (item.ID === action.data.ID))
            _.assign(toUpdate, action.data)
            return {
                ...state,
                modalOpen: false,
                dataList: dataList
            }
        }
        case PROJECT_DELETE_INFO: {
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
        dispatch({ type: PROJECT_SEARCH_FORM, data: params })
        axios.get('/api/project/list', { params })
            .then(res => {
                dispatch({ type: PROJECT_GET_LIST, payload: res.data })
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
                if (code == 1) {
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
        axios.post('/api/project/edit', info)
            .then(res => {
                const { code, msg, data } = res.data
                if (code == 1) {
                    dispatch({ type: PROJECT_EDIT_INFO, msg, data })
                } else {
                    dispatch({ type: PROJECT_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}

export function deleteInfo(ID) {
    return dispatch => {
        axios.post('/api/project/delete', { ID })
            .then(res => {
                const { code, msg } = res.data
                if (code == 1) {
                    dispatch({ type: PROJECT_DELETE_INFO, msg, ID })
                } else {
                    dispatch({ type: PROJECT_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}

export function getProjManagerList() {
    return dispatch => {
        axios.get('/api/projManager/list')
            .then(res => {
                dispatch({ type: PROJECT_GET_PROJMANAGER_LIST, payload: res.data })
            })
            .catch(e => {

            })
    }
}