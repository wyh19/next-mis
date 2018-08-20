USE_MOCK && require('../mock/organization')

import axios from 'axios'
import _ from 'lodash'

const ORGA_SEARCH_FORM = 'ORGA_SEARCH_FORM'
const ORGA_GET_LIST = 'ORGA_GET_LIST'
const ORGA_HANDLE_MODAL_FORM = 'ORGA_HANDLE_MODAL_FORM'
const ORGA_ADD_INFO = 'ORGA_ADD_INFO'
const ORGA_EDIT_INFO = 'ORGA_EDIT_INFO'
const ORGA_DELETE_INFO = 'ORGA_DELETE_INFO'
const ORGA_SHOW_MSG = 'ORGA_SHOW_MSG'

const initState = {
    searchForm: {},
    modalOpen: false,
    formType: 'add',
    formData: {},
    dataList: [],
    msg: ''
}

export function organization(state = initState, action) {
    switch (action.type) {
        case ORGA_SEARCH_FORM:{
            return {
                ...state,
                searchForm:action.data
            }
        }
        case ORGA_GET_LIST: {
            return { ...state, dataList: action.payload }
        }
        case ORGA_HANDLE_MODAL_FORM: {
            return {
                ...state,
                formType: action.formType,
                modalOpen: action.modalOpen,
                formData: action.formData
            }
        }
        case ORGA_ADD_INFO: {
            let dataList = _.cloneDeep(state.dataList)
            dataList.push(action.data)
            return {
                ...state,
                modalOpen: false,
                dataList: dataList
            }
        }
        case ORGA_EDIT_INFO: {
            let dataList = _.cloneDeep(state.dataList)
            let toUpdate = _.find(dataList, item => (item.ID === action.data.ID))
            _.assign(toUpdate, action.data)
            return {
                ...state,
                modalOpen: false,
                dataList: dataList
            }
        }
        case ORGA_DELETE_INFO: {
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
        dispatch({ type: ORGA_SEARCH_FORM, data: params })
        axios.get('/api/orga/list', { params })
            .then(res => {
                dispatch({ type: ORGA_GET_LIST, payload: res.data })
            })
            .catch(e => {

            })
    }
}

export function handleModalForm(formType, modalOpen, formData) {
    return { type: ORGA_HANDLE_MODAL_FORM, formType, modalOpen, formData }
}

export function addInfo(info) {
    return dispatch => {
        axios.post('/api/orga/add', info)
            .then(res => {
                const { code, msg, data } = res.data
                if (code == 1) {
                    dispatch({ type: ORGA_ADD_INFO, msg, data })
                } else {
                    dispatch({ type: ORGA_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}

export function editInfo(info) {
    return dispatch => {
        axios.post('/api/orga/edit', info)
            .then(res => {
                const { code, msg, data } = res.data
                if (code == 1) {
                    dispatch({ type: ORGA_EDIT_INFO, msg, data })
                } else {
                    dispatch({ type: ORGA_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}

export function deleteInfo(ID) {
    return dispatch => {
        axios.post('/api/orga/delete', { ID })
            .then(res => {
                const { code, msg } = res.data
                if (code == 1) {
                    dispatch({ type: ORGA_DELETE_INFO, msg, ID })
                } else {
                    dispatch({ type: ORGA_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}