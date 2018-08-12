/**
 * Created by 30113 on 2018/6/11.
 */
import React from 'react'

export default function valueControl(Comp){
    return class WrapperControl extends React.Component{
        constructor(props){
            super(props)
            this.state={}
            this.handleChange = this.handleChange.bind(this)
        }
        handleChange(key,val){
            this.setState({
                [key]:val
            })
        }
        render(){
            return <Comp onChange={this.handleChange} state={this.state} {...this.props}/>
        }
    }
}