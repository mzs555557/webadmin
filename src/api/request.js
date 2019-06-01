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
// 添加商品
const Admin_AddProduct = (data) => {
  return Instance.post('/admin/addproduct', data);
};
//  添加分类
const Admin_AddCategory = (data) => {
  return Instance.post('/admin/addcategory', data);
};
// 获取全部的分类
const Admin_Categories = () => {
  return Instance.get('/buyer/product/categories');
};
// 获取商品
const Admin_AllGoods = (data) => {
  return Instance.post('/buyer/product/list', data);
};
// 通过categoryType获取categoryName
const Admin_Type2Name = (categoryType) => {
  return Instance.get(`/admin/categorietype/${categoryType}`);
};

export {
  Admin_Login,
  Admin_Regist,
  Admin_AddProduct,
  Admin_AddCategory,
  Admin_Categories,
  Admin_AllGoods,
  Admin_Type2Name,
};
