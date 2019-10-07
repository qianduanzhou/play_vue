const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  userInfo: state => state.user.userInfo,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  roles: state => state.user.roles
}
export default getters
