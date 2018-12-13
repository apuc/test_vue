<template>
  <div class="control-wrap" v-click-outside="hideInputAndSave">
    <span class="control-title">{{currentControl.title}} {{index}}</span>

    <button class="control-btn"
            v-show="!currentControl.isActive"
            @click="switchInputState"
    >
      <span class="control-btn__text">{{makeSpaces}}</span>
      <img src="../assets/icons/down.svg" width="6" alt="">
    </button>

    <div class="input-wrap" v-show="currentControl.isActive">
      <input type="text"
             class="input"
             ref="myInput"
             v-model="inputValue"
             @input="writeDigits($event.target.value)"
             @keyup.esc="switchInputState"
             @keyup.enter="hideInputAndSave"
             @keydown.tab.prevent="tabStep"
      >

      <button type="button" class="increment" @click="increment">
        <img src="../assets/icons/input_up.svg" width="8" alt="">
      </button>

      <button type="button" class="decrement" @click="decrement">
        <img src="../assets/icons/input_down.svg" width="8" alt="">
      </button>

      <button type="button"
              class="helper"
              v-if="currentControl.helper"
              @click="helperMethodCall(currentControl.name)"
      >
        {{helperTitle}}
      </button>
    </div>
  </div>
</template>

<script>
  import {mapState, mapGetters, mapMutations} from 'vuex';

  export default {
    name: "ContolInput",
    props: {
      index: {
        type: Number,
        required: true
      },
    },
    data() {
      return {
        inputValue: 0,
        isActivated: false
      }
    },
    computed: {
      ...mapState({
        constValue: state => state.constValue
      }),
      ...mapGetters({
        controls: 'controls',
      }),
      currentControl() {
        return this.controls[this.index]
      },
      makeString() {
        return String(this.currentControl.value);
      },
      makeSpaces() {
        return this.makeString.replace(/[^0-9.]/g,'').replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      },
      helperTitle() {
        if (this.currentControl.helper) {
          return this.currentControl.helper.title
        }
      },
    },
    methods: {
      ...mapMutations({
        changeControlState: 'CHANGE_CONTROL_VALUE',
        changeControlStatus: 'CHANGE_CONTROL_STATUS',
        calculateControlsValueAndSetToMain: 'CALCULATE_CONTROLS_VALUE_AND_SET_TO_MAIN',
        bindConrollersValue: 'BIND_CONTROLLERS_VALUE',
        switchInputsTab: 'SWITCH_BETWEEN_INPUTS_TAB',
        switchInputsShiftTab: 'SWITCH_BETWEEN_INPUTS_SHIFT_TAB',
      }),
      switchInputState() {
        this.inputValue = this.currentControl.value;
        this.isActivated = !this.isActivated;

        this.changeControlStatus({
          isActive: !this.currentControl.isActive,
          index: this.index
        })
      },
      writeDigits(value) {
        this.inputValue = value.replace(/[^0-9.]/g,'');
      },
      hideInputAndSave() {
        if (this.currentControl.isActive) {
          if (this.currentControl.name === 'model') {
            this.bindConrollersValue({
              name: 'model',
              value: this.inputValue,
              index: this.index
            })
          }

          this.isActivated = false;
          this.changeControlState({
            value: this.inputValue,
            index: this.index,
          });

          this.changeControlStatus({
            isActive: false,
            index: this.index
          });
        }
      },
      increment() {
        this.inputValue++
      },
      decrement() {
        if (this.inputValue > 0) {
          this.inputValue--
        }
      },
      helperMethodCall(name) {
        if (name === 'main') {
          this.calculateControlsValueAndSetToMain({
            main: 'main',
            model: 'model'
          });
          this.inputValue = this.currentControl.value;
        } else if (name === 'model') {
          this.inputValue = this.constValue;
        }
      },
      tabStep(e) {
        if (e.shiftKey) {
          this.switchInputsShiftTab({
            isActive: !this.currentControl.isActive,
            index: this.index
          });
        } else {
          this.switchInputsTab({
            isActive: !this.currentControl.isActive,
            index: this.index
          });
        }
      }
    },
    directives: {
      'click-outside': {
        bind: function(el, binding, vNode) {
          // Provided expression must evaluate to a function.
          if (typeof binding.value !== 'function') {
            const compName = vNode.context.name;
            let warn = `[Vue-click-outside:] provided expression '${binding.expression}' is not a function, but has to be`;
            if (compName) { warn += `Found in component '${compName}'` }

            console.warn(warn);
          }
          // Define Handler and cache it on the element
          const bubble = binding.modifiers.bubble;
          const handler = (e) => {
            if (bubble || (!el.contains(e.target) && el !== e.target)) {
              binding.value(e)
            }
          };
          el.__vueClickOutside__ = handler;

          // add Event Listeners
          document.addEventListener('click', handler);
        },

        unbind: function(el, binding) {
          // Remove Event Listeners
          document.removeEventListener('click', el.__vueClickOutside__);
          el.__vueClickOutside__ = null

        }
      }
    },
    updated() {
      if (!this.isActivated) {
        this.isActivated = true;
        this.$refs.myInput.select();
      }
    }
  }
</script>

<style scoped>
  .control-wrap {
    display: flex;
    align-items: center;
    margin-top: 40px;
  }

  .control-title {
    margin-right: 50px;

    font-size: 15px;
    color: #999999;
  }

  .input,
  .control-btn {
    width: 116px;
    height: 30px;
    padding: 5px 10px;
    box-sizing: border-box;
  }

  .control-btn {
    position: relative;
    z-index: 1;

    display: flex;
    justify-content: flex-start;

    background-color: transparent;
    border: 0;
    cursor: pointer;
  }

  .control-btn__text {
    margin-right: 6px;
  }

  .input-wrap {
    position: relative;
    z-index: 1;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .input {
    background-color: #fafafa;
    border: 1px solid #DDDDDD;
  }

  .increment,
  .decrement {
    position: absolute;
    top: 3px;
    right: 10px;
    z-index: 2;

    padding: 0;

    line-height: 1;

    background-color: transparent;
    border: none;
    cursor: pointer;
  }

  .decrement {
    top: auto;
    bottom: 3px;
  }

  .helper {
    position: absolute;
    bottom: -12px;
    z-index: 1;

    padding: 0;

    font-size: 11px;
    color: #42A4F4;

    background-color: transparent;
    border: none;
    cursor: pointer;
  }
</style>