/* eslint-disable camelcase */
import Instance from './host';

// 登陆路由

const Admin_Login = (data) => {
  return Instance.post('/user/login', data);
};
// 注册路由
const Admin_Regist = (data) => {
  return Instance.post('/user/regist', data);
};


export { Admin_Login, Admin_Regist };
