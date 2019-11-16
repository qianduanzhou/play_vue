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
	test: {
		url: '/userManage/test',
    method: 'get'
	},
}
