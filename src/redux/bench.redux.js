import _ from 'lodash'

const RESET_STATE = 'RESET_STATE'
const CHANGE_SEARCH_FORM = 'CHANGE_SEARCH_FORM'

const initState = {
    searchForm: [
        {
            name: 'name',
            text: '名称',
            value: ''
        },
        {
            name: 'beginTime',
            text: '开始时间',
            value: ''
        },
        {
            name: 'endTime',
            text: '结束时间',
            value: ''
        }
    ]
}

export function bench(state = initState, action) {
    switch (action.type) {
        case RESET_STATE:
            return initState
        case CHANGE_SEARCH_FORM:
            const { key, value } = action.payload
            let searchForm = JSON.parse(JSON.stringify(state.searchForm))
            let field = _.find(searchForm, v => v.name === key)
            field.value = value
            return { ...state, searchForm }
        default:
            return state
    }
}

export function resetBenchState() {
    return { type: RESET_STATE }
}
export function changeSearchForm(key, value) {
    return { type: CHANGE_SEARCH_FORM, payload: { key, value } }
}