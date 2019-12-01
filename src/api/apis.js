export default {
  /**
   * 权限模块
   */
  login: { //  登录
    url: '/userManage/login',
    method: 'post'
  },
  getUserList: { //  获取账号列表
		url: '/userManage/userList',
    method: 'get'
  },
  createdUser: { //  创建账号
    url: '/userManage/register',
    method: 'post'
  },
  deleteUser: { //  删除账号
    url: '/userManage/delete',
    method: 'post'
  },
  /**
   * 用户模块
   */
  getCustomerList: { //  获取用户列表
    url: '/customerManage/customerList',
    method: 'get'
  },
  getPushList: { //  获取用户发布列表
    url: '/customerManage/pushList',
    method: 'get'
  },
  /**
   * 商品模块
   */
  gameList: { //  获取商品列表
    url: '/gameManage/gameList',
    method: 'get'
  },
  createGoods: { //  新建商品
    url: '/gameManage/createGames',
    method: 'post'
  },
  getGoodsDetail: { //  查看商品详情
    url: '/gameManage/gameDetail',
    method: 'get'
  },
  editGoods: { //  编辑商品
    url: '/gameManage/editGames',
    method: 'post'
  },
  deleteGoods: { // 删除商品
    url: '/gameManage/deleteGames',
    method: 'post'
  },
  /**
   * 订单模块
   */
  orderList: { //  订单列表
    url: '/orderManage/orderList',
    method: 'get'
  },
  /**
   * 数据模块
   */
  reportList: {
    url: '/reportManage/reportList',
    method: 'get'
  },
	test: {
		url: '/userManage/test',
    method: 'get'
	},
}
