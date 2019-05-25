/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Cookies from './CookieUtils';

// 登陆权限认证

const cookies = new Cookies();

class AuthRouter extends Component {
  render() {
    const { component: Component, ...rest } = this.props;
    const isLogin = cookies.get('token') !== null;
    return (
      <Route {...rest}
        render={(props) => {
        return isLogin ? <Component {...props} /> : <Redirect to="/user/login" />;
      }}
      />
    );
  }
}
export default AuthRouter;
