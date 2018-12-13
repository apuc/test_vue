import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    controls: [
      {
        value: 0,
        title: 'Контролл',
        name: 'main',
        helper: {
          title: 'Сумма',
        },
        isActive: false
      },
      {
        value: 0,
        title: 'Контролл',
        name: 'model',
        helper: {
          title: 'Константа',
        },
        isActive: false
      },
      {
        value: 0,
        title: 'Контролл',
        name: 'model',
        isActive: false
      },
    ],
    constValue: 1000,
  },
  getters: {
    controls: state => state.controls,
    // helper: state => state.helper,
  },
  mutations: {
    'CHANGE_CONTROL_VALUE': (state, data) => {
      state.controls[data.index].value = data.value;
    },
    'CHANGE_CONTROL_STATUS': (state, data) => {
      state.controls[data.index].isActive = data.isActive;
    },
    'CALCULATE_CONTROLS_VALUE_AND_SET_TO_MAIN': (state, names) => {
      const controls = state.controls.filter(control => control.name === names.model);
      let calculatedValue = 0;

      for (let i = 0; i < controls.length; i++) {
        calculatedValue = calculatedValue + controls[i].value;
      }
      const main = state.controls.find(control => control.name === names.main);
      main.value = calculatedValue;
    },
    'BIND_CONTROLLERS_VALUE': (state, data) => {
      const controls = state.controls.filter(control => control.name === data.name);

      for (let i = 0; i < controls.length; i++) {
          controls[i].value = data.value;
      }
    },
    'SWITCH_BETWEEN_INPUTS_TAB': (state, data) => {
      state.controls[data.index].isActive = data.isActive;

      if (data.index === state.controls.length - 1) {
        state.controls[0].isActive = !data.isActive;
      } else {
        state.controls[data.index + 1].isActive = !data.isActive;
      }
    },
    'SWITCH_BETWEEN_INPUTS_SHIFT_TAB': (state, data) => {
      state.controls[data.index].isActive = data.isActive;

      if (data.index === 0) {
        state.controls[state.controls.length - 1].isActive = !data.isActive;
      } else {
        state.controls[data.index - 1].isActive = !data.isActive;
      }
    },
  },
})
