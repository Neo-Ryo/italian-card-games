import { createStore } from 'vuex';
import Axios from 'axios';

export default createStore({
  state: {
    isNavBar: false,
    player: {
      pseudo: '',
      email: '',
      avatar: '',
      wallet: '',
    },
  },
  mutations: {
    showNavbar() {
      this.state.isNavBar = !this.state.isNavBar;
    },
    getPlayerData(state, payload) {
      state.player = {
        ...payload,
      };
    },
  },
  actions: {
    getPlayerData({ commit }) {
      commit('getPlayerData');
    },
    showNavbar({ commit }) {
      commit('showNavbar');
    },
  },
  modules: {},
});
