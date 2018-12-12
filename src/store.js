import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    control: 0
  },
  getters: {
    control: state => state.control
  },
  mutations: {
    'CHANGE_CONTROL_STATE': (state, controlValue) => {
      state.control = controlValue;
    }
  },
  actions: {

  }
})
