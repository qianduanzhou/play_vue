
const user = {
  state: {
    userInfo: {}
  },

  mutations: {
    SET_USERINFO: (state,value) => {
      state.userInfo = value
    }
  }
}

export default user
