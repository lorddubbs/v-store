export default {
    namespaced: true,
    state: {
      user: []
    },
    getters: {
      user: state => state.user
    },
    mutations: {
      SET_USER(state, user) {
        state.user = user;
      }
    },
    actions: {
      async loginUser({ commit }, payload) {
        let user = await this.$apiService.auth.loginUser(payload);
        commit("SET_USER", user);
      }
    }
  };
  