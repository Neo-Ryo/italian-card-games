import { createStore } from 'vuex';
import Axios from 'axios';

export default createStore({
  state: {
    player: {
      pseudo: '',
      email: '',
      avatar: '',
      wallet: '',
    },
  },
  mutations: {
    getPlayerData() {
      this.state.player = {
        pseudo: 'Marco',
        email: 'test@email',
      };
    },
  },
  actions: {},
  modules: {},
});
