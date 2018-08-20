USE_MOCK && require('../mock/orgaType')

import axios from 'axios'
import _ from 'lodash'

const ORGATYPE_SEARCH_FORM = 'ORGATYPE_SEARCH_FORM'
const ORGATYPE_GET_LIST = 'ORGATYPE_GET_LIST'
const ORGATYPE_HANDLE_MODAL_FORM = 'ORGATYPE_HANDLE_MODAL_FORM'
const ORGATYPE_ADD_INFO = 'ORGATYPE_ADD_INFO'
const ORGATYPE_EDIT_INFO = 'ORGATYPE_EDIT_INFO'
const ORGATYPE_DELETE_INFO = 'ORGATYPE_DELETE_INFO'
const ORGATYPE_SHOW_MSG = 'ORGATYPE_SHOW_MSG'
const ORGATYPE_GET_ORGA_LIST = 'ORGATYPE_GET_ORGA_LIST'
const ORGATYPE_GET_INTERFACE_LIST = 'ORGATYPE_GET_INTERFACE_LIST'

const initState = {
    searchForm: {},
    modalOpen: false,
    formType: 'add',
    formData: {},
    dataList: [],
    msg: '',
    orgaList: [],
    interfaceList:[],
}

export function orgaType(state = initState, action) {
    switch (action.type) {
        case ORGATYPE_SEARCH_FORM: {
            return {
                ...state,
                searchForm: action.data
            }
        }
        case ORGATYPE_GET_LIST: {
            return { ...state, dataList: action.payload }
        }
        case ORGATYPE_GET_ORGA_LIST: {
            return { ...state, orgaList: action.payload }
        }
        case ORGATYPE_GET_INTERFACE_LIST: {
            return { ...state, interfaceList: action.payload }
        }
        case ORGATYPE_HANDLE_MODAL_FORM: {
            return {
                ...state,
                formType: action.formType,
                modalOpen: action.modalOpen,
                formData: action.formData
            }
        }
        case ORGATYPE_ADD_INFO: {
            let dataList = _.cloneDeep(state.dataList)
            dataList.push(action.data)
            return {
                ...state,
                modalOpen: false,
                dataList: dataList
            }
        }
        case ORGATYPE_EDIT_INFO: {
            let dataList = _.cloneDeep(state.dataList)
            let toUpdate = _.find(dataList, item => (item.ID === action.data.ID))
            _.assign(toUpdate, action.data)
            return {
                ...state,
                modalOpen: false,
                dataList: dataList
            }
        }
        case ORGATYPE_DELETE_INFO: {
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
        dispatch({ type: ORGATYPE_SEARCH_FORM, data: params })
        axios.get('/api/orgaType/list', { params })
            .then(res => {
                dispatch({ type: ORGATYPE_GET_LIST, payload: res.data })
            })
            .catch(e => {

            })
    }
}

export function handleModalForm(formType, modalOpen, formData) {
    return { type: ORGATYPE_HANDLE_MODAL_FORM, formType, modalOpen, formData }
}

export function addInfo(info) {
    return dispatch => {
        axios.post('/api/orgaType/add', info)
            .then(res => {
                const { code, msg, data } = res.data
                if (code == 1) {
                    dispatch({ type: ORGATYPE_ADD_INFO, msg, data })
                } else {
                    dispatch({ type: ORGATYPE_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}

export function editInfo(info) {
    return dispatch => {
        axios.post('/api/orgaType/edit', info)
            .then(res => {
                const { code, msg, data } = res.data
                if (code == 1) {
                    dispatch({ type: ORGATYPE_EDIT_INFO, msg, data })
                } else {
                    dispatch({ type: ORGATYPE_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}

export function deleteInfo(ID) {
    return dispatch => {
        axios.post('/api/orgaType/delete', { ID })
            .then(res => {
                const { code, msg } = res.data
                if (code == 1) {
                    dispatch({ type: ORGATYPE_DELETE_INFO, msg, ID })
                } else {
                    dispatch({ type: ORGATYPE_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}

export function getOrgaList() {
    return dispatch => {
        axios.get('/api/orga/list')
            .then(res => {
                dispatch({ type: ORGATYPE_GET_ORGA_LIST, payload: res.data })
            })
            .catch(e => {

            })
    }
}

export function getInterfaceList() {
    return dispatch => {
        axios.get('/api/interface/list')
            .then(res => {
                dispatch({ type: ORGATYPE_GET_INTERFACE_LIST, payload: res.data })
            })
            .catch(e => {

            })
    }
}