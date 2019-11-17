export default {
  /**
   * 权限模块
   */
  //  登录
  login: {
    url: '/userManage/login',
    method: 'post'
  },
  //  获取账号列表
  getUserList: {
		url: '/userManage/userList',
    method: 'get'
  },
  //  创建账号
  createdUser: {
    url: '/userManage/register',
    method: 'post'
  },
  //  删除账号
  deleteUser: {
    url: '/userManage/delete',
    method: 'post'
  },
  /**
   * 用户模块
   */
  //  获取用户列表
  getCustomerList: {
    url: '/customerManage/customerList',
    method: 'get'
  },
  getPushList: {
    url: '/customerManage/pushList',
    method: 'get'
  },
  /**
   * 商品模块
   */
  //  获取商品列表
  gameList: {
    url: '/gameManage/gameList',
    method: 'get'
  },
  //  新建商品
  createGoods: {
    url: '/gameManage/createGames',
    method: 'post'
  },
  //  查看商品详情
  getGoodsDetail: {
    url: '/gameManage/gameDetail',
    method: 'get'
  },
  //  编辑商品
  editGoods: {
    url: '/gameManage/editGames',
    method: 'post'
  },
  // 删除商品
  deleteGoods: {
    url: '/gameManage/deleteGames',
    method: 'post'
  },
	test: {
		url: '/userManage/test',
    method: 'get'
	},
}
