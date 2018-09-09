import React from 'react'

class Footer extends React.Component {
    render() {
        return (
            <div id="login-foot">
                ©{new Date().getFullYear()}&nbsp;
                京ICP证{'xxxxx'}号&nbsp;
                <i className="c-icon-icrlogo"></i>&nbsp;
                <a id="jgwab" target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11000002000001">
                    京公网安备{'1100000xxxxxx'}号</a>&nbsp;
                <i className="c-icon-jgwablogo"></i>
            </div>
        )
    }
}

export default Footer