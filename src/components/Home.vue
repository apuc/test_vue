<template>
  <div class="home" v-click-outside="hideInputAndSave">
    <div class="control-wrap">
      <button class="control-span"
              v-if="!isInputActive"
              @click="swithInputState"
      >
        {{makeSpaces}}
      </button>

      <div class="input-wrap">
        <input type="text"
               v-show="isInputActive"
               ref="inputController"
               v-model="inputValue"
               @input="deleteNonNumber($event.target.value)"
               @keyup.esc="swithInputState"
               @keyup.enter="hideInputAndSave"
        >

        <button type="button" class="increment">
          +
        </button>

        <button type="button" class="decrement">
          +
        </button>
      </div>
    </div>

  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex';

export default {
  name: 'home',
  data() {
    return {
      isInputActive: false,
      inputValue: 0,
    }
  },
  computed: {
    ...mapGetters({
      control: 'control',
    }),
    makeSpaces() {
      return this.control.replace(/[^0-9.]/g,'').replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
  },
  methods: {
    ...mapMutations({
      changeControlState: 'CHANGE_CONTROL_STATE',
    }),
    swithInputState(e) {
      this.isInputActive = !this.isInputActive;
      this.inputValue = this.control;
      this.inputValue.split(' ');
      this.$refs.inputController.select();
      this.$refs.inputController.focus();
    },
    // selectValue(e) {
    //   e.target.select();
    // },
    deleteNonNumber(value) {
      this.inputValue = value.replace(/[^0-9.]/g,'');
    },
    hideInputAndSave() {
      this.changeControlState(this.inputValue);
      this.isInputActive = !this.isInputActive;
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
  }
}
</script>

<style scoped>
  .control-span {
    position: relative;
    z-index: 1;

    padding: 5px 10px;

    background-color: transparent;
    border: 0;
    cursor: pointer;
  }

  .control-span::after {
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
    z-index: -1;
  }

  .increment {

  }
</style>