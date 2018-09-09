import React,{Component} from 'react'
import {} from 'antd'

import './NewsList.scss'

class NewsList extends Component{
    render(){
        return(
            <div className='ep-newslist'>
                <div>
                    <span>全部(1300)</span>
                    <span>平面(1300)</span>
                    <span>网络(1300)</span>
                    <span>微信(1300)</span>
                    <span>微博(1300)</span>
                    <span>自媒体(1300)</span>
                </div>
            </div>
        )
    }
}
export default NewsList