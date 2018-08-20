USE_MOCK && require('../mock/projManager')

import axios from 'axios'
import _ from 'lodash'

const PROJMANAGER_SEARCH_FORM = 'PROJMANAGER_SEARCH_FORM'
const PROJMANAGER_GET_LIST = 'PROJMANAGER_GET_LIST'
const PROJMANAGER_HANDLE_MODAL_FORM = 'PROJMANAGER_HANDLE_MODAL_FORM'
const PROJMANAGER_ADD_INFO = 'PROJMANAGER_ADD_INFO'
const PROJMANAGER_EDIT_INFO = 'PROJMANAGER_EDIT_INFO'
const PROJMANAGER_DELETE_INFO = 'PROJMANAGER_DELETE_INFO'
const PROJMANAGER_SHOW_MSG = 'PROJMANAGER_SHOW_MSG'

const initState = {
    searchForm: {},
    modalOpen: false,
    formType: 'add',
    formData: {},
    dataList: [],
    msg: '',
}

export function projManager(state = initState, action) {
    switch (action.type) {
        case PROJMANAGER_SEARCH_FORM: {
            return {
                ...state,
                searchForm: action.data
            }
        }
        case PROJMANAGER_GET_LIST: {
            return { ...state, dataList: action.payload }
        }
        case PROJMANAGER_HANDLE_MODAL_FORM: {
            return {
                ...state,
                formType: action.formType,
                modalOpen: action.modalOpen,
                formData: action.formData
            }
        }
        case PROJMANAGER_ADD_INFO: {
            let dataList = _.cloneDeep(state.dataList)
            dataList.push(action.data)
            return {
                ...state,
                modalOpen: false,
                dataList: dataList
            }
        }
        case PROJMANAGER_EDIT_INFO: {
            let dataList = _.cloneDeep(state.dataList)
            let toUpdate = _.find(dataList, item => (item.ID === action.data.ID))
            _.assign(toUpdate, action.data)
            return {
                ...state,
                modalOpen: false,
                dataList: dataList
            }
        }
        case PROJMANAGER_DELETE_INFO: {
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
        dispatch({ type: PROJMANAGER_SEARCH_FORM, data: params })
        axios.get('/api/projManager/list', { params })
            .then(res => {
                dispatch({ type: PROJMANAGER_GET_LIST, payload: res.data })
            })
            .catch(e => {

            })
    }
}

export function handleModalForm(formType, modalOpen, formData) {
    return { type: PROJMANAGER_HANDLE_MODAL_FORM, formType, modalOpen, formData }
}

export function addInfo(info) {
    return dispatch => {
        axios.post('/api/projManager/add', info)
            .then(res => {
                const { code, msg, data } = res.data
                if (code == 1) {
                    dispatch({ type: PROJMANAGER_ADD_INFO, msg, data })
                } else {
                    dispatch({ type: PROJMANAGER_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}

export function editInfo(info) {
    return dispatch => {
        axios.post('/api/projManager/edit', info)
            .then(res => {
                const { code, msg, data } = res.data
                if (code == 1) {
                    dispatch({ type: PROJMANAGER_EDIT_INFO, msg, data })
                } else {
                    dispatch({ type: PROJMANAGER_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}

export function deleteInfo(ID) {
    return dispatch => {
        axios.post('/api/projManager/delete', { ID })
            .then(res => {
                const { code, msg } = res.data
                if (code == 1) {
                    dispatch({ type: PROJMANAGER_DELETE_INFO, msg, ID })
                } else {
                    dispatch({ type: PROJMANAGER_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}

