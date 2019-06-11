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
const Admin_AllGoods = (page = 0, size = 10) => {
  return Instance.get(`/buyer/product/list/page=${page}&size=${size}`);
};
// 通过categoryType获取categoryName
const Admin_Type2Name = (categoryType) => {
  return Instance.get(`/admin/categorietype/${categoryType}`);
};
// 下架商品
const Admin_DownGoods = (productId) => {
  return Instance.get(`/admin/downproduct/${productId}`);
};
// 上架商品
const Admin_UpGoods = (productId) => {
  return Instance.get(`/admin/upproduct/${productId}`);
};
// 筛选商品
const Admin_SelectGoods = (page = 0, data = {}) => {
  return Instance.post(`/buyer/product/selectgoods/page=${page}&size=10`, data);
};
// 筛选订单
const Admin_SelectOrders = (page = 0, data = {}) => {
  return Instance.post(`/admin/selectorder/page=${page}&size=10`, data);
};
// 筛选详情
const Admin_SelectDetails = (page = 0, data = {}) => {
  return Instance.post(`/admin/selectdetail/page=${page}&size=10`, data);
};
// 订单统计
const Admin_DetailStatistics = () => {
  return Instance.get('/admin/selectdetail/statistics');
};
// 分类筛选
const Admin_SelectACategories = (page = 0, data = {}) => {
  return Instance.post(`/admin/selectcategory/page=${page}&size=10`, data);
};
// 分类删除
const Admin_DeleteCategory = (categoryId) => {
  return Instance.delete(`/admin/deletecategory/categoryId=${categoryId}`);
};
// 分类修改
const Admin_RenameCategory = (categoryId, categoryName) => {
  return Instance.put(`/admin/renamecategory/categoryId=${categoryId}&categoryName=${categoryName}`);
};
// 修改订单
const Admin_ModifyOrder = (orderId, data = { payStatus: 1 }) => {
  return Instance.put(`/admin/modifyorder/orderId=${orderId}`, data);
};
export {
  Admin_Login,
  Admin_Regist,
  Admin_AddProduct,
  Admin_AddCategory,
  Admin_Categories,
  Admin_AllGoods,
  Admin_Type2Name,
  Admin_DownGoods,
  Admin_UpGoods,
  Admin_SelectGoods,
  Admin_SelectOrders,
  Admin_SelectDetails,
  Admin_DetailStatistics,
  Admin_SelectACategories,
  Admin_DeleteCategory,
  Admin_RenameCategory,
  Admin_ModifyOrder,
};
