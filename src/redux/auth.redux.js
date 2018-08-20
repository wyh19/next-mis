/**
 * Created by 30113 on 2018/6/11.
 */
import axios from 'axios'

const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const CHANGE_INPUT = 'CHANGE_INPUT'
const LOGOUT = 'LOGOUT'

const initState = {
    redirectTo: '',
    msg: '',
    isAuth: false,
    user: '',
    pwd: ''
}

export function auth(state = initState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return { ...state, isAuth: true, user: action.payload.user, msg: '', redirectTo: '/home' }
        case ERROR_MSG:
            return { ...state, msg: action.msg }
        case LOAD_DATA:
            return { ...state, ...action.payload, isAuth: true }
        case CHANGE_INPUT:
            return { ...state, msg:action.payload.msg, [action.payload.key]: action.payload.value }
        case LOGOUT:
            return {...state,isAuth:false,redirectTo: '/login'}
            default:
            return state
    }
}

function authSuccess(obj) {
    return { type: AUTH_SUCCESS, payload: obj }
}

function errorMsg(msg) {
    return { msg, type: ERROR_MSG, }
}

export function changeInput(key, value) {
    if (key == 'user' && !value) {
        return { type: CHANGE_INPUT, payload: { key, value ,msg:'用户名不能为空'} }
    } else if (key == 'pwd' && !value) {
        return { type: CHANGE_INPUT, payload: { key, value ,msg:'密码不能为空'} }
    } else {
        return { type: CHANGE_INPUT, payload: { key, value ,msg:''} }
    }
}

export function loadData(userinfo) {
    return { type: LOAD_DATA, payload: userinfo }
}

export function register({ user, pwd, repwd }) {
    if (!user || !pwd || !repwd) {
        return errorMsg('用户名密码必须输入')
    }
    if (pwd !== repwd) {
        return errorMsg('密码和确认密码不同')
    }
    return dispatch => {
        axios.post('/api/user/register', { user, pwd })
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(authSuccess({ user, pwd }))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}

export function login({ user, pwd }) {
    if (!user) {
        return errorMsg('用户名不能为空')
    }
    if (!pwd) {
        return errorMsg('密码不能为空')
    }
    return dispatch => {
        axios.post('/api/user/login', { user, pwd })
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(authSuccess({ user, pwd }))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            })
            .catch(e => {
                //dispatch(errorMsg('网络发生错误'))
                //todo:假设登录成功
                dispatch(authSuccess({ user, pwd }))
            })
    }
}

export function logout(){
    return {type:LOGOUT}
}