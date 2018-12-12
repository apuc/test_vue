import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    controls: [
      {
        value: 0,
        title:  'Контроллер',
        helper:{
          title: 'Сумма',
          // calculate() {}
        }
      },
      {
        value: 0,
        title:  'Контроллер',
        helper:{
          title: 'Константа',
          // calculate() {}
        }
      },
      {
        value: 0,
        title:  'Контроллер',
      },

    ],
  },
  getters: {
    controls: state => state.controls,
    // helper: state => state.helper,
  },
  mutations: {
    'CHANGE_CONTROL_STATE': (state, data) => {
      state.controls[data.index] = data.value;
    }
  },
  actions: {

  }
})
