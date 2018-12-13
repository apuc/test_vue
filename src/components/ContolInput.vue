<template>
  <div class="control-wrap" v-click-outside="hideInputAndSave">
    <span class="control-title">{{currentControl.title}} {{index}}</span>

    <button class="control-btn"
            v-if="!currentControl.isActive"
            @click="switchInputState"
    >
      {{makeSpaces}}
    </button>

    <div class="input-wrap" v-show="currentControl.isActive">
      <input type="text"
             ref="myInput"
             v-model="inputValue"
             @input="writeDigits($event.target.value)"
             @keyup.esc="switchInputState"
             @keyup.enter="hideInputAndSave"
             @keydown.tab.prevent="tabStep"
      >

      <button type="button"
              class="helper"
              v-if="currentControl.helper"
              @click="helperMethodCall(currentControl.name)"
      >
        {{helperTitle}}
      </button>

      <button type="button" class="increment" @click="increment"></button>

      <button type="button" class="decrement" @click="decrement"></button>
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
        console.log(123);
        this.inputValue = value.replace(/[^0-9.]/g,'');
      },
      hideInputAndSave() {
        this.isActivated = false;
        this.changeControlState({
          value: this.inputValue,
          index: this.index,
        });

        this.changeControlStatus({
          isActive: false,
          index: this.index
        });

        if (this.currentControl.name === 'model') {
          this.bindConrollersValue({
            name: 'model',
            value: this.inputValue,
            index: this.index
          })
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
  }

  .control-title {
    font-size: 14px;
    color: #b2b2b2;
  }

  .control-btn {
    position: relative;
    z-index: 1;

    padding: 5px 10px;

    background-color: transparent;
    border: 0;
    cursor: pointer;
  }

  .control-btn::after {
    content: '';
    position: absolute;
    right: 0;
    top: 50%;

    display: block;
    width: 5px;
    height: 5px;

    transform: translateY(-50%) rotate(-45deg);
    border: 1px solid;
    border-top: none;
    border-right: none;
  }

  .input-wrap {
    position: relative;
    z-index: 1;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .increment,
  .decrement {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;

    padding: 3px;

    line-height: 1;
  }

  .increment::before,
  .decrement::before {
    content: '';
    position: absolute;
    left: 0;


    display: block;
    width: 5px;
    height: 5px;

    transform: translateY(-50%) rotate(-45deg);
    border: 1px solid;
    border-top: none;
    border-right: none;
  }

  .increment::before {
    border: 1px solid;
    border-bottom: none;
    border-left: none;
  }

  .decrement {
    top: 10px;
  }

  .helper {
    padding: 0;

    font-size: 12px;
    color: #65b5f5;

    background-color: transparent;
    border: none;
    cursor: pointer;
  }
</style>