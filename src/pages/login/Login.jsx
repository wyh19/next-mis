/**
 * Created by 30113 on 2018/6/6.
 */
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import InfoForm from './InfoForm'
import Footer from './Footer'
import './Login.scss';

@connect(
  state => state.auth
)
class Login extends React.Component {
  render() {
    return (
      <div className='login-bg'>
        {this.props.redirectTo && this.props.redirectTo !== '/login' ? (
          <Redirect to={this.props.redirectTo} />
        ) : null}
        <InfoForm />
        <Footer />
      </div>
    );
  }
}

export default Login;
