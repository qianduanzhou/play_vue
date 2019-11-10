export default {
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
	test: {
		url: '/userManage/test',
    method: 'get'
	},
}
