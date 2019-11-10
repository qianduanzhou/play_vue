const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  userInfo: state => state.user.userInfo,
  avatar: state => state.user.avatar,
  roles: state => state.user.roles
}
export default getters
