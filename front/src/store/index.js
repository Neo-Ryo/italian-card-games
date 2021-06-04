import { createStore } from 'vuex';
import Axios from 'axios';

export default createStore({
  state: {
    isNavBar: true,
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
    getPlayerData() {
      this.state.player = {
        pseudo: 'Marco',
        email: 'test@email',
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
