import React from 'react'
import { Button, Form, Input, DatePicker } from 'antd'
import { connect } from 'react-redux'
import { changeSearchForm } from '../../redux/bench.redux'

@connect(
    state => state.bench,
    { changeSearchForm }
)
/**
 * 搜索表单组件
 */
class SearchForm extends React.Component {
    handleChange(key, value) {
        this.props.changeSearchForm(key,value)
    }
    getForm(fields) {
        return fields.map(v =>{
            return  (
                <div key={v.name}>
                    <span>{v.text}</span>
                    <Input
                        value={v.value}
                        onChange={e => this.handleChange(v.name, e.target.value)} />
                </div>
            )
        })
    }
    render() {
        return (
            <div>
                {
                    this.getForm(this.props.searchForm)
                }
            </div>
        )
    }
}
export default SearchForm