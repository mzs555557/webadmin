// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [
  {
    name: '退出',
    path: '/user/login',
    icon: 'yonghu',
    data: 'logout',
  },
];

const asideMenuConfig = [
  {
    name: '工作台',
    path: '/dashboard',
    icon: 'home2',
  },
  // {
  //   name: '订单报表',
  //   path: '/order/report',
  //   icon: 'chart',
  // },
  {
    name: '订单管理',
    path: '/order/list',
    icon: 'shopcar',
  },
  {
    name: '分类管理',
    path: '/chargeback',
    icon: 'cascades',
  },
  {
    name: '订单详情',
    path: '/dispatch',
    icon: 'clock',
  },
  {
    name: '商品管理',
    path: '/goods',
    icon: 'shopcar',
  },
  {
    name: '添加商品',
    path: '/add/goods',
    icon: 'publish',
  },
  // {
  //   name: '添加订单',
  //   path: '/add/order',
  //   icon: 'edit2',
  // },
  {
    name: '\u6DFB\u52A0\u5206\u7C7B',
    path: '/add/category',
    icon: 'home',
  },
];

export { headerMenuConfig, asideMenuConfig };
